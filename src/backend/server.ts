import Fastify from 'fastify'
import Ws from 'fastify-websocket'

import { logger } from '../utils/logger'
import { initAuthentication } from './services/authentication'
import { config } from './services/config'

const fastify = Fastify({ logger: true })
fastify.register(Ws)

initAuthentication(fastify)

fastify.get('/', { websocket: true }, connection => {
  const send = <T>(data: T) => connection.socket.send(JSON.stringify(data))

  connection.socket.on('message', (message: Buffer) => {
    const parse = JSON.parse(message.toString('utf-8'))
    logger.info('message', parse)
    send({ type: 'HELLO', message: 'hi from server' })
  })
})

fastify.listen(config.PORT, (err, address) => {
  if (err) throw err
  console.log(`Server running on port ${address}`)
})
