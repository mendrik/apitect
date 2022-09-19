import { config as dotenv } from 'dotenv'
import { MongoClient } from 'mongodb'

import { Tag } from '../services/config'
import { initDatabaseFx } from '../stores/$serverState'

export const config: Record<Tag, number | string> = dotenv({ path: '.test-env' }).parsed as any

declare global {
  // noinspection ES6ConvertVarToLetConst
  var __MONGO_URI__: string
}

export const withDatabase = () => {
  let connection: MongoClient

  beforeAll(async () => {
    connection = await initDatabaseFx(globalThis.__MONGO_URI__)
  })

  afterAll(async () => {
    await connection.close()
  })
}
