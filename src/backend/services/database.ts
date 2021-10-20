import { Collection, MongoClient } from 'mongodb'
import { isNil, propOr } from 'ramda'

import { User } from '../../shared/types/domain/user'
import { failOn } from '../../shared/utils/failOn'
import { config } from './config'

export enum Collections {
  users = 'users',
  documents = 'documents'
}

export type CollectionMap = {
  users: User
  documents: Document
}

const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}?authSource=admin`

const db = async (): Promise<Record<keyof Collections, Collection>> => {
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(process.env.DB_NAME)
  console.log(`Successfully connected to database: ${db.databaseName}`)
  const collections = {}
  return new Proxy(collections, {
    get: (target: any, p: keyof Collections & string): Collection => {
      if (p in Collections) {
        return db.collection(p)
      } else {
        throw `Unsupported collection ${p}`
      }
    }
  })
}

export const collection = <
  K extends keyof CollectionMap & string,
  R = Collection<CollectionMap[K]>
>(
  name: K
): Promise<R> => db().then(propOr(null, name)).then(failOn<R>(isNil, 'collection not found'))

export default db
