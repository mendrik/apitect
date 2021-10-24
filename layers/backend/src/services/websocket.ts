import { Event } from 'effector'
import { FastifyInstance } from 'fastify'
import { SocketStream } from 'fastify-websocket'
import * as t from 'io-ts'
import { verify } from 'jsonwebtoken'
import { decode } from '~shared/codecs/decode'
import { ClientMessage, TClientMessage } from '~shared/types/messages'
import { logger } from '~shared/utils/logger'

import { Send } from '../server'
import { idCodec } from '../utils/idCodec'
import { config } from './config'
import { eventMap, Payload } from './serverState'

const openWebsocket = (connection: SocketStream) => {
  const send: Send = msg => connection.socket.send(JSON.stringify(msg))
  try {
    const { id: userId } = decode(t.type({ id: idCodec }))(
      verify(connection.socket.protocol, `${config.TOKEN_KEY}`)
    )
    connection.socket.on('message', (buffer: Buffer) => {
      try {
        const data = JSON.parse(buffer.toString('utf-8'))
        const message: ClientMessage = decode(TClientMessage)(data)
        const event = eventMap[message.type] as Event<Payload<typeof message.type>>
        logger.info(`User[${userId}]/${message.type}:`, message)
        event({ message, send, userId })
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
