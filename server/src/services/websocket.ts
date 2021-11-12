import { FastifyInstance } from 'fastify'
import { SocketStream } from 'fastify-websocket'
import * as t from 'io-ts'
import { verify } from 'jsonwebtoken'
import { Api, ApiSchema } from '~shared/api'
import { decode } from '~shared/codecs/decode'
import { ApiCallRequest, TApiCallRequest } from '~shared/types/apiCall'
import { logger } from '~shared/utils/logger'

import { apiMapping, ServerApiMethod, TApiResponse } from '../api/serverApi'
import { config } from './config'

export type Respond = <T extends keyof ApiSchema>(payload: ReturnType<Api[T]>) => void

const openWebsocket = (connection: SocketStream) => {
  const respond: Respond = response => {
    const validMessage = decode(TApiResponse)(response)
    connection.socket.send(JSON.stringify(validMessage))
  }
  try {
    const { email, name } = decode(t.type({ email: t.string, name: t.string }))(
      verify(connection.socket.protocol, `${config.TOKEN_KEY}`)
    )
    connection.socket.on('message', (buffer: Buffer) => {
      try {
        const data = JSON.parse(buffer.toString('utf-8'))
        const apiCallRequest: ApiCallRequest = decode(TApiCallRequest)(data)
        const apiCall: ServerApiMethod<keyof ApiSchema> = apiMapping[apiCallRequest.method]
        logger.info(`${name} [${email}]/${apiCallRequest.method}:`, apiCallRequest.input)
        void apiCall({ email, respond, payload: apiCallRequest.input })
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
