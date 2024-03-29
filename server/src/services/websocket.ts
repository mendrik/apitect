/* eslint-disable @typescript-eslint/no-explicit-any */
import { SocketStream } from '@fastify/websocket'
import { FastifyInstance } from 'fastify'
import { verify } from 'jsonwebtoken'
import { ZApiRequest } from '~shared/apiRequest'
import { ServerApiMethod, ServerParam, ZApiResponse } from '~shared/apiResponse'
import { ApiMethod } from '~shared/apiTypes'
import { JwtPayload } from '~shared/types/response/token'
import { isError } from '~shared/utils/errors'
import { logger } from '~shared/utils/logger'

import { apiMapping } from '../api/serverApi'
import { config } from './config'
import { socketErrorHandler } from './errorHandler'
import { getStack } from './errors'

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
      const data = JSON.parse(content)
      try {
        const apiRequest = ZApiRequest.parse(data)
        logger.info(`${name} [${email}]/${apiRequest.method}`, data)
        const apiCall = apiMapping[apiRequest.method] as ServerApiMethod<ApiMethod>
        const param: ServerParam<ApiMethod> = {
          email,
          payload: apiRequest.payload,
          docId
        }
        return apiCall(param)
          .then(send(apiRequest.id, apiRequest.method))
          .catch(socketErrorHandler(connection.socket.send.bind(connection.socket), apiRequest.id))
      } catch (e) {
        if (isError(e)) {
          logger.error(e.message + `[${email}]`, getStack(e))
        } else {
          throw e
        }
      }
    })
    connection.socket.on('close', () => {
      logger.info(`disconnect`, { email, name, docId })
    })
  } catch (e) {
    logger.error('Unauthorized socket access', isError(e) ? e.message : e)
  }
}

export const initWebsocket = (fastify: FastifyInstance) =>
  fastify.register(async () => fastify.get('/', { websocket: true }, openWebsocket))
