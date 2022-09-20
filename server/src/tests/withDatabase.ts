import { readFileSync } from 'fs'
import { MongoClient } from 'mongodb'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import path from 'path'
import { pipe } from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import { logger } from '~shared/utils/logger'

import { config } from '../services/config'
import { Collections } from '../services/database'
import { initDatabaseFx } from '../stores/$serverState'

const dbName = `${config.MONGO_INITDB_DATABASE}`

export const withDatabase = () => {
  jest.setTimeout(100000)
  let connection: MongoClient

  const importCollection = async (name: Collections) => {
    const file = readFileSync(path.join(__dirname, `../../../database/dummy/${name}.json`), {
      encoding: 'utf-8'
    })
    const col = connection.db(dbName).collection(name)
    file
      .split(/\r?\n/)
      .filter(isNotEmpty)
      .forEach(line => {
        try {
          const doc = pipe(JSON.parse)(line)
          logger.debug(`import ${name}`, doc)
          col.insertOne(doc)
        } catch (e: any) {
          // eslint-disable-next-line no-console
          console.error(`Import failed: ${name}, ${e.message}`, line)
          throw e
        }
      })
  }

  beforeAll(async () => {
    const mongoServer = await MongoMemoryReplSet.create({ replSet: { count: 4 } })
    connection = await initDatabaseFx(mongoServer.getUri())
    await importCollection(Collections.users)
    await importCollection(Collections.enums)
    await importCollection(Collections.documents)
    await importCollection(Collections.nodeSettings)
    await importCollection(Collections.tagsSettings)
  })

  afterAll(async () => {
    await connection.close()
    logger.info('Database disconnected')
  })
}
