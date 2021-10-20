import { createEvent, createStore, Event } from 'effector'

import { ClientMessage } from '../../shared/types/messages'
import { Send } from '../server'
import db from './database'

export type Payload<K extends ClientMessage['type']> = {
  message: Extract<ClientMessage, { type: K }>
  send: Send
  userId: number
}

export type EventMap = {
  [K in ClientMessage['type']]: Event<Payload<K>>
}

export const authorizedConnections = new WeakMap<Send, boolean>()

type ServerState = {}

export const eventMap: EventMap = {
  NODE: createEvent(),
  DOCUMENT: createEvent()
}

export const state = createStore<ServerState>({})

state.on(eventMap.DOCUMENT, (state, { send, userId }) => {
  db.document
    .findFirst({
      where: { OR: [{ lastUsedBy: { some: { id: userId } } }, { users: { some: { id: userId } } }] }
    })
    .then(document => ({
      type: 'DOCUMENT' as const,
      document
    }))
    .then(send)
})
