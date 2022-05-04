import Cors from '@fastify/cors'
import Ws from '@fastify/websocket'
import Fastify from 'fastify'
import { logger } from '~shared/utils/logger'

import { initAuthentication } from './services/authentication'
import { config } from './services/config'
import { initWebsocket } from './services/websocket'
import { initDatabaseFx } from './stores/$serverState'

const fastify = Fastify({ logger: true })
fastify.register(Ws)
fastify.register(Cors)

void initDatabaseFx()
  .then(() => {
    initAuthentication(fastify)
    initWebsocket(fastify)

    fastify.listen({ port: Number(config.PORT) }, (err, address) => {
      if (err) throw err
      console.log(`Server running on port ${address}`)
    })
  })
  .catch(e => logger.error(`Failed to start ${e.message}`, undefined))
