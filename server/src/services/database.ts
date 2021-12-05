import {
  ClientSession,
  Collection as CollectionType,
  MongoClient,
  TransactionOptions
} from 'mongodb'
import { keys, pluck } from 'ramda'
import { Document } from '~shared/types/domain/document'
import { Enum } from '~shared/types/domain/enum'
import { User } from '~shared/types/domain/user'
import { Value } from '~shared/types/domain/values/value'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'
import { ProjectUsersSettings } from '~shared/types/forms/projectUsersSettings'
import { TagsSettings } from '~shared/types/forms/tagsSettings'
import { UserSettings } from '~shared/types/forms/userSettings'
import { ensure } from '~shared/utils/ramda'

import { config } from './config'
import { serverState } from './serverState'

const dbName = `${config.MONGO_INITDB_DATABASE}`

export enum Collections {
  users = 'users',
  documents = 'documents',
  tagsSettings = 'tagsSettings',
  userSettings = 'userSettings',
  nodeSettings = 'nodeSettings',
  projectUsersSettings = 'projectUsersSettings',
  values = 'values',
  enums = 'enums'
}

export type CollectionMap = {
  users: User
  documents: Document
  tagsSettings: TagsSettings
  userSettings: UserSettings
  nodeSettings: NodeSettings
  projectUsersSettings: ProjectUsersSettings
  values: Value
  enums: Enum
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
  await db.collection(Collections.users).createIndex({ email: 1 }, { unique: true })
  await db.collection(Collections.documents).createIndex({ id: 1 }, { unique: true })
  await db.collection(Collections.documents).createIndex({ owner: 1 })
  await db.collection(Collections.nodeSettings).createIndex({ nodeId: 1 }, { unique: true })
  await db.collection(Collections.projectUsersSettings).createIndex({ docId: 1 }, { unique: true })
  await db.collection(Collections.tagsSettings).createIndex({ docId: 1 }, { unique: true })
  await db
    .collection(Collections.userSettings)
    .createIndex({ docId: 1, email: 1 }, { unique: true })
  await db.collection(Collections.values).createIndex({ nodeId: 1 })
  await db.collection(Collections.values).createIndex({ tag: 1 })
  await db.collection(Collections.values).createIndex({ author: 1 })
  await db.collection(Collections.values).createIndex({ owner: 1 })
  await db.collection(Collections.enums).createIndex({ docId: 1, name: 1 }, { unique: true })
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
