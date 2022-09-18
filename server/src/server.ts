import Cors from '@fastify/cors'
import Ws from '@fastify/websocket'
import Fastify from 'fastify'
import { logger } from '~shared/utils/logger'

import { initAuthentication } from './services/authentication'
import { config } from './services/config'
import { initWebsocket } from './services/websocket'
import { initDatabaseFx } from './stores/$serverState'

const fastify = Fastify({ logger: false })
fastify.register(Ws)
fastify.register(Cors)

void initDatabaseFx()
  .then(() => {
    logger.info('Adding authentication routes...')
    initAuthentication(fastify)
    logger.info('Initializing websocket...')
    initWebsocket(fastify)

    logger.info('Starting server...')
    fastify.listen({ port: Number(config.PORT) }, (err, address) => {
      if (err) throw err
      logger.info(`Server running on port ${address}`)
    })
  })
  .catch(e => logger.error(`Failed to start ${e.message}`, undefined))
