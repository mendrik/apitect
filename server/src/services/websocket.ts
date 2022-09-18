import { SocketStream } from '@fastify/websocket'
import { FastifyInstance } from 'fastify'
import { verify } from 'jsonwebtoken'
import { ZodError } from 'zod'
import { ZApiRequest } from '~shared/apiRequest'
import { ApiError, ServerParam, ZApiError, ZApiResponse } from '~shared/apiResponse'
import { ApiMethod } from '~shared/apiTypes'
import { Fn } from '~shared/types/generic'
import { HttpError } from '~shared/types/httpError'
import { NotificationError } from '~shared/types/notificationError'
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
    if (e instanceof NotificationError) {
      return $send({ status: 400, message: e.message, title: e.title, notificationType: e.type })
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
      const response = ZApiResponse.parse(res)
      connection.socket.send(JSON.stringify(response))
      return payload
    }
  try {
    const { email, name, docId } = JwtPayload.parse(
      verify(connection.socket.protocol, `${config.TOKEN_KEY}`)
    )
    logger.info(`Connect`, { email, name, docId })

    connection.socket.on('message', (buffer: Buffer) => {
      const content = buffer.toString('utf-8')
      logger.message(content)
      const data = JSON.parse(content)
      try {
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
      } catch (e) {
        if (e instanceof Error) {
          logger.error(e.message + `[${email}]`, getStack(e))
        } else {
          throw e
        }
      }
    })
    connection.socket.on('close', () => {
      logger.info(`disconnect`, { email, name, docId })
    })
  } catch (e: any) {
    logger.error('Unauthorized socket access', e.message)
  }
}

export const initWebsocket = (fastify: FastifyInstance) => {
  fastify.get('/', { websocket: true }, openWebsocket)
}
