import { createEffect, createEvent, createStore, Event } from 'effector'
import { MongoClient, ObjectId } from 'mongodb'
import { isNil } from 'ramda'

import { Send } from '../server'
import { User } from '../types/user'
import { collection, connect } from './database'
import { ClientMessage, wrapServerMessage } from '../../../shared/src/types/messages'
import { Maybe } from '../../../shared/src/types/generic'
import { failOn } from '../../../shared/src/utils/failOn'
import { TUiDocument } from '../../../shared/src/types/domain/document'
import { field } from '../../../shared/src/utils/ramda'

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
