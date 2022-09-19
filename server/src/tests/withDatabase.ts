import { MongoClient } from 'mongodb'

import { initDatabaseFx } from '../stores/$serverState'

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
