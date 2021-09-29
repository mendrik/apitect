import Fastify from 'fastify'
import Cors from 'fastify-cors'
import Ws from 'fastify-websocket'

import { decode } from '../shared/codecs/decode'
import { ClientMessage, TClientMessage } from '../shared/types/messages'
import { logger } from '../shared/utils/logger'
import { initAuthentication } from './services/authentication'
import { config } from './services/config'

const fastify = Fastify({ logger: true })
fastify.register(Ws)
fastify.register(Cors)

initAuthentication(fastify)

fastify.get('/', { websocket: true }, connection => {
  const send = <T>(data: T) => connection.socket.send(JSON.stringify(data))

  connection.socket.on('message', (buffer: Buffer) => {
    try {
      const data = JSON.parse(buffer.toString('utf-8'))
      const message: ClientMessage = decode(TClientMessage)(data)
      logger.info('message', message)
      send({ type: 'PROJECT', message: 'hi from server' })
    } catch (e) {
      logger.error('Error in socket', e)
    }
  })
})

fastify.listen(config.PORT, (err, address) => {
  if (err) throw err
  console.log(`Server running on port ${address}`)
})
