import { createEffect, createEvent, createStore, Event } from 'effector'
import { MongoClient, ObjectId } from 'mongodb'
import { ClientMessage } from '~shared/types/clientMessages'
import { Maybe } from '~shared/types/generic'
import { Send } from '~shared/types/serverMessages'

import { connect } from './database'

export type Payload<K extends ClientMessage['type']> = {
  message: Extract<ClientMessage, { type: K }>
  send: Send
  userId: ObjectId
}

export type EventMap = {
  [K in ClientMessage['type']]: Event<Payload<K>>
}

type ServerState = {
  database: Maybe<MongoClient>
}

export const eventMap: EventMap = {
  NEW_NODE: createEvent(),
  DEL_NODE: createEvent(),
  DOCUMENT: createEvent()
}

export const serverState = createStore<ServerState>({
  database: null
})

export const initDatabase = createEffect(() => connect())

serverState.on(initDatabase.doneData, (state, database) => ({ ...state, database }))
