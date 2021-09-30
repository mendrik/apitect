import Fastify from 'fastify'
import Cors from 'fastify-cors'
import Ws from 'fastify-websocket'

import { decode } from '../shared/codecs/decode'
import { ClientMessage, ServerMessage, TClientMessage } from '../shared/types/messages'
import { logger } from '../shared/utils/logger'
import { initAuthentication } from './services/authentication'
import { config } from './services/config'
import { eventMap } from './services/serverState'

const fastify = Fastify({ logger: true })
fastify.register(Ws)
fastify.register(Cors)

export type Send = (message: ServerMessage) => void

initAuthentication(fastify)
fastify.get('/', { websocket: true }, connection => {
  const send: Send = msg => connection.socket.send(JSON.stringify(msg))

  connection.socket.on('message', (buffer: Buffer) => {
    try {
      const data = JSON.parse(buffer.toString('utf-8'))
      const message: ClientMessage = decode(TClientMessage)(data)
      const eventName = message.type.toLowerCase() as Lowercase<ClientMessage['type']>
      logger.info('message', message)
      eventMap[eventName]({ message, send })
    } catch (e) {
      logger.error('Error in socket', e)
    }
  })
})

fastify.listen(config.PORT, (err, address) => {
  if (err) throw err
  console.log(`Server running on port ${address}`)
})
