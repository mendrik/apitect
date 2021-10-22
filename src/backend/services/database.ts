import {
  ClientSession,
  Collection as CollectionType,
  MongoClient,
  TransactionOptions
} from 'mongodb'

import { ensure } from '../../shared/utils/ramda'
import { Document } from '../types/document'
import { User } from '../types/user'
import { config } from './config'
import { serverState } from './serverState'

const dbName = 'apitect'

export enum Collections {
  users = 'users',
  documents = 'documents'
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
  await db.collection('users').createIndex({ email: 1 }, { unique: true })
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
    return await session.withTransaction(fn, opt)
  } finally {
    await session.endSession()
  }
}
