import { createEffect, createEvent, createStore, Event } from 'effector'
import { MongoClient } from 'mongodb'
import { ClientMessage } from '~shared/types/clientMessages'
import { Maybe } from '~shared/types/generic'

import { connect } from './database'
import { Send } from './websocket'

export type Payload<K extends ClientMessage['type']> = {
  message: Extract<ClientMessage, { type: K }>
  send: Send
  email: string
}

export type EventMap = {
  [K in ClientMessage['type']]: Event<Payload<K>>
}

type ServerState = {
  database: Maybe<MongoClient>
}

export const eventMap: EventMap = {
  NEW_NODE: createEvent(),
  NODE_SETTINGS: createEvent(),
  DELETE_NODE: createEvent(),
  DOCUMENT: createEvent()
}

export const serverState = createStore<ServerState>({
  database: null
})

export const initDatabase = createEffect(() => connect())

serverState.on(initDatabase.doneData, (state, database) => ({ ...state, database }))
