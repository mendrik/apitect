import Fastify from 'fastify'
import Ws from 'fastify-websocket'
import { config } from 'dotenv'
import { logger } from './services/logger'

const conf = config({ path: '.server-env' }).parsed!

const fastify = Fastify({
  logger: true
})

fastify.register(Ws)

fastify.get('/', { websocket: true }, (connection, rep) => {
  connection.socket.on('message', (message: Buffer) => {
    const parse = JSON.parse(message.toString('utf-8'))
    logger.info('message', parse)
    connection.socket.send(JSON.stringify({ type: 'HELLO', message: 'hi from server' }))
  })
})

fastify.listen(conf.PORT, (err, address) => {
  if (err) throw err
  console.log(`Server running on port ${address}`)
})
