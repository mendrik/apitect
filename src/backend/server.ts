import Fastify from 'fastify'
import Ws from 'fastify-websocket'
import { config } from 'dotenv'

const conf = config().parsed!

const fastify = Fastify({
  logger: true
})

fastify.register(Ws)

fastify.get('/', { websocket: true }, (connection, req) => {
  connection.socket.on('message', message => {
    // message.toString() === 'hi from client'
    connection.socket.send({ type: 'HELLO', message: 'hi from server' })
  })
})

fastify.listen(conf.PORT, (err, address) => {
  if (err) throw err
})
