import { Collection as CollectionType, Db, MongoClient } from 'mongodb'

import { Document } from '../types/document'
import { User } from '../types/user'
import { config } from './config'
import { serverState } from './serverState'

export enum Collections {
  users = 'users',
  documents = 'documents'
}

export type CollectionMap = {
  users: User
  documents: Document
}

export const connect = async (): Promise<Db> => {
  const uri = `mongodb://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`
  console.log(`Connecting to database: ${uri}`)
  const client = new MongoClient(uri)
  await client.connect()
  console.log(`Successfully connected to database`)
  return client.db(process.env.DB_NAME)
}

export const collection: (
  name: keyof CollectionMap & string
) => CollectionType<CollectionMap[typeof name]> = name => {
  const db = serverState.getState().database
  if (db == null) {
    throw Error('Database not found')
  }
  return db.collection(name)
}
