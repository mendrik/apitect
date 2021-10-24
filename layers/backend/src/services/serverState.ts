import { createEffect, createEvent, createStore, Event } from 'effector'
import { MongoClient, ObjectId } from 'mongodb'
import { isNil } from 'ramda'

import { Send } from '../server'
import { User } from '../types/user'
import { collection, connect } from './database'
import { ClientMessage, wrapServerMessage } from '../shared/types/messages'
import { Maybe } from '../shared/types/generic'
import { failOn } from '../shared/utils/failOn'
import { field } from '../shared/utils/ramda'
import { TUiDocument } from '../shared/types/domain/document'

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
  NODE: createEvent(),
  DOCUMENT: createEvent()
}

export const serverState = createStore<ServerState>({
  database: null
})

export const initDatabase = createEffect(() => connect())

serverState.on(initDatabase.doneData, (state, database) => ({ ...state, database }))
serverState.on(eventMap.DOCUMENT, (state, { send, userId }) => {
  void collection('users')
    .findOne({ _id: userId })
    .then(failOn<User>(isNil, 'user not found'))
    .then(field('lastDocument'))
    .then(docId =>
      collection('documents')
        .findOne({ _id: docId })
        .then(failOn(isNil, `Document ${docId} not found`))
    )
    .then(wrapServerMessage(TUiDocument))
    .then(send)
})
