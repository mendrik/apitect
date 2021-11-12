import { FastifyInstance } from 'fastify'
import { SocketStream } from 'fastify-websocket'
import * as t from 'io-ts'
import { verify } from 'jsonwebtoken'
import { ApiMethod } from '~shared/api'
import { Respond, ServerApiMethod, TApiResponse } from '~shared/apiResponse'
import { decode } from '~shared/codecs/decode'
import { TApiRequest } from '~shared/types/apiRequest'
import { logger } from '~shared/utils/logger'

import { apiMapping } from '../api/serverApi'
import { config } from './config'

const openWebsocket = (connection: SocketStream) => {
  const response: <K extends ApiMethod>(id: string, method: K) => Respond<K> =
    (id, method) => payload => {
      const validMessage = decode(TApiResponse)({
        id,
        method,
        payload
      })
      connection.socket.send(JSON.stringify(validMessage))
      return payload
    }
  try {
    const { email, name } = decode(t.type({ email: t.string, name: t.string }))(
      verify(connection.socket.protocol, `${config.TOKEN_KEY}`)
    )
    connection.socket.on('message', (buffer: Buffer) => {
      try {
        const data = JSON.parse(buffer.toString('utf-8'))
        const apiRequest = decode(TApiRequest)(data)
        const apiCall: ServerApiMethod<typeof apiRequest.method> = apiMapping[apiRequest.method]
        logger.info(`${name} [${email}]/${apiRequest.method}:`, apiRequest.payload)
        const respond: Respond<typeof apiRequest.method> = response(
          apiRequest.id,
          apiRequest.method
        )
        void apiCall({ email, respond, payload: apiRequest.payload })
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
