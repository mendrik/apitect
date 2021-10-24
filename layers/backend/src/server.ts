import Fastify from 'fastify'
import Cors from 'fastify-cors'
import Ws from 'fastify-websocket'
import { ServerMessage } from '~shared/types/messages'
import { logger } from '~shared/utils/logger'

import { initAuthentication } from './services/authentication'
import { config } from './services/config'
import { initDatabase } from './services/serverState'
import { initWebsocket } from './services/websocket'

const fastify = Fastify({ logger: true })
fastify.register(Ws)
fastify.register(Cors)

export type Send = <T extends ServerMessage>(message: T) => void

void initDatabase()
  .then(() => {
    initAuthentication(fastify)
    initWebsocket(fastify)

    fastify.listen(config.PORT, (err, address) => {
      if (err) throw err
      console.log(`Server running on port ${address}`)
    })
  })
  .catch(e => logger.error(`Failed to start ${e.message}`, undefined))
