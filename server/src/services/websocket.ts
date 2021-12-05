import { FastifyInstance } from 'fastify'
import { SocketStream } from 'fastify-websocket'
import { verify } from 'jsonwebtoken'
import { ZodError } from 'zod'
import { ApiError, ServerParam, ZApiError, ZApiResponse } from '~shared/apiResponse'
import { ApiMethod } from '~shared/types/api'
import { ZApiRequest } from '~shared/types/apiRequest'
import { Fn } from '~shared/types/generic'
import { HttpError } from '~shared/types/httpError'
import { JwtPayload } from '~shared/types/response/token'
import { logger } from '~shared/utils/logger'

import { apiMapping } from '../api/serverApi'
import { config } from './config'
import { getStack } from './errors'

const socketErrorHandler =
  (send: Fn, id: string) =>
  (e: Error): void => {
    logger.error(e.message, getStack(e))
    const $send = (data: Omit<ApiError, 'error' | 'id'>) =>
      send(JSON.stringify(ZApiError.parse({ id, error: 'error', ...data })))

    if (e instanceof ZodError) {
      return $send({ status: 400, message: e.message })
    }
    if (e instanceof HttpError) {
      return $send({ status: e.status, message: e.message, field: e.field })
    }
    return $send({ status: 500, message: e.message })
  }

const openWebsocket = (connection: SocketStream) => {
  const send =
    (id: string, method: ApiMethod) =>
    <T>(payload: T) => {
      const res = {
        id,
        method,
        payload
      }
      try {
        const validMessage = ZApiResponse.parse(res)
        connection.socket.send(JSON.stringify(validMessage))
      } catch (e) {
        logger.error('Failed to validate or send out response', { ...res, error: e })
      }
      return payload
    }
  try {
    const { email, name, docId } = JwtPayload.parse(
      verify(connection.socket.protocol, `${config.TOKEN_KEY}`)
    )

    connection.socket.on('message', (buffer: Buffer) => {
      try {
        const data = JSON.parse(buffer.toString('utf-8'))
        const apiRequest = ZApiRequest.parse(data)
        logger.info(`${name} [${email}]/${apiRequest.method}`, data)
        const apiCall = apiMapping[apiRequest.method]
        const param: ServerParam<ApiMethod> = {
          email,
          payload: apiRequest.payload,
          docId
        }
        return apiCall(param as any)
          .then(send(apiRequest.id, apiRequest.method))
          .catch(socketErrorHandler(connection.socket.send.bind(connection.socket), apiRequest.id))
      } catch (e: any) {
        logger.error(e.message, getStack(e))
      }
    })
  } catch (e) {
    logger.error('Unauthorized socket access', e)
  }
}

export const initWebsocket = (fastify: FastifyInstance) => {
  fastify.get('/', { websocket: true }, openWebsocket)
}
