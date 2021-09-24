import Fastify from 'fastify'
import Ws from 'fastify-websocket'

import { initAuthentication } from './services/authentication'
import { config } from './services/config'
import { logger } from './services/logger'

const fastify = Fastify({ logger: false })
fastify.register(Ws)

initAuthentication(fastify)

fastify.get('/', { websocket: true }, (connection, rep) => {
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
