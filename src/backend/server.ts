import Fastify from 'fastify'
import Cors from 'fastify-cors'
import Ws from 'fastify-websocket'

import { ServerMessage } from '../shared/types/messages'
import { initAuthentication } from './services/authentication'
import { config } from './services/config'
import { initWebsocket } from './services/websocket'

const fastify = Fastify({ logger: true })
fastify.register(Ws)
fastify.register(Cors)

export type Send = <T extends ServerMessage>(message: T) => void

initAuthentication(fastify)
initWebsocket(fastify)

fastify.listen(config.PORT, (err, address) => {
  if (err) throw err
  console.log(`Server running on port ${address}`)
})
