import { MongoClient } from 'mongodb'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { logger } from '~shared/utils/logger'

import { initDatabaseFx } from '../stores/$serverState'

export const withDatabase = () => {
  jest.setTimeout(100000)
  let connection: MongoClient

  beforeAll(async () => {
    const mongoServer = await MongoMemoryReplSet.create({ replSet: { count: 4 } })
    connection = await initDatabaseFx(mongoServer.getUri())
  })

  afterAll(async () => {
    await connection.close()
    logger.info('Database disconnected')
  })
}
