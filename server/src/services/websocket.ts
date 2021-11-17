import { FastifyInstance } from 'fastify'
import { SocketStream } from 'fastify-websocket'
import { verify } from 'jsonwebtoken'
import { ApiMethod } from '~shared/api'
import { TApiResponse } from '~shared/apiResponse'
import { TApiRequest } from '~shared/types/apiRequest'
import { JwtPayload } from '~shared/types/response/token'
import { logger } from '~shared/utils/logger'

import { apiMapping } from '../api/serverApi'
import { config } from './config'

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
        const validMessage = TApiResponse.parse(res)
        connection.socket.send(JSON.stringify(validMessage))
      } catch (e) {
        logger.error('Failed to respond', res)
      }
      return payload
    }
  try {
    const { email, name } = JwtPayload.parse(
      verify(connection.socket.protocol, `${config.TOKEN_KEY}`)
    )
    connection.socket.on('message', (buffer: Buffer) => {
      try {
        const data = JSON.parse(buffer.toString('utf-8'))
        const apiRequest = TApiRequest.parse(data)
        logger.info(`${name} [${email}]/${apiRequest.method}`, apiRequest.payload)
        const apiCall = apiMapping[apiRequest.method]
        const param = { email, payload: apiRequest.payload } as any
        return apiCall(param).then(send(apiRequest.id, apiRequest.method))
      } catch (e) {
        logger.error('Error in socket', e)
      }
    })
  } catch (e) {
    logger.error('Unauthorized socket access', e)
  }
}

export const initWebsocket = (fastify: FastifyInstance) => {
  fastify.get('/', { websocket: true }, openWebsocket)
}
