import { Event } from 'effector'
import { FastifyInstance } from 'fastify'
import { SocketStream } from 'fastify-websocket'
import * as t from 'io-ts'
import { verify } from 'jsonwebtoken'
import { pathEq } from 'ramda'
import { decode } from '~shared/codecs/decode'
import { ClientMessage, TClientMessage } from '~shared/types/clientMessages'
import { ServerMessage, TServerMessage } from '~shared/types/serverMessages'
import { logger } from '~shared/utils/logger'

import { config } from './config'
import { eventMap, Payload } from './serverState'

export type Send = <
  T extends ServerMessage['type'],
  P extends Extract<ServerMessage, { type: T }>['payload']
>(
  type: T
) => (payload: P) => Promise<void> | void

const openWebsocket = (connection: SocketStream) => {
  const send: Send = type => payload => {
    const types = TServerMessage.types
    const message = types.find(pathEq(['props', 'type', 'value'], type))!
    const validMessage = decode(message as any)({ type, payload })
    connection.socket.send(JSON.stringify(validMessage))
  }
  try {
    const { email, name } = decode(t.type({ email: t.string, name: t.string }))(
      verify(connection.socket.protocol, `${config.TOKEN_KEY}`)
    )
    connection.socket.on('message', (buffer: Buffer) => {
      try {
        const data = JSON.parse(buffer.toString('utf-8'))
        const message: ClientMessage = decode(TClientMessage)(data)
        const event = eventMap[message.type] as Event<Payload<typeof message.type>>
        logger.info(`${name} [${email}]/${message.type}:`, message)
        event({ message, send, email })
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
