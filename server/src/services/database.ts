import {
  ClientSession,
  Collection as CollectionType,
  MongoClient,
  TransactionOptions
} from 'mongodb'
import { keys, pluck } from 'ramda'
import { Document } from '~shared/types/domain/document'
import { User } from '~shared/types/domain/user'
import { ensure } from '~shared/utils/ramda'

import { config } from './config'
import { serverState } from './serverState'

const dbName = `${config.MONGO_INITDB_DATABASE}`

export enum Collections {
  users = 'users',
  documents = 'documents',
  nodeSettings = 'node-settings'
}

export type CollectionMap = {
  users: User
  documents: Document
}

export const connect = async (): Promise<MongoClient> => {
  console.log(`Connecting to database: ${config.DATABASE}`)
  const client = new MongoClient(`${config.DATABASE}`)
  await client.connect()
  console.log(`Successfully connected to database`)
  const db = client.db(dbName)
  const existing = await db.listCollections().toArray().then(pluck('name'))

  keys(Collections)
    .filter(name => !existing.includes(name))
    .forEach(name => db.createCollection(name, {}))
  await db.collection('users').createIndex({ email: 1 }, { unique: true })
  await db.collection('documents').createIndex({ id: 1 }, { unique: true })
  return client
}

export const collection: (
  name: keyof CollectionMap & string
) => CollectionType<CollectionMap[typeof name]> = name => {
  const client = ensure(serverState.getState().database)
  return client.db(dbName).collection(name)
}

export const withTransaction = async <T>(
  fn: (session: ClientSession) => Promise<T>,
  opt?: TransactionOptions
) => {
  const client = ensure(serverState.getState().database)
  const session = client.startSession()
  try {
    session.startTransaction(opt)
    const res = await fn(session)
    await session.commitTransaction()
    return res
  } finally {
    await session.endSession()
  }
}
