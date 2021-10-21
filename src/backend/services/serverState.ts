import { createEvent, createStore, Event } from 'effector'
import { ObjectId } from 'mongodb'
import { isNil } from 'ramda'

import { ClientMessage } from '../../shared/types/messages'
import { failOn } from '../../shared/utils/failOn'
import { field } from '../../shared/utils/ramda'
import { Send } from '../server'
import { User } from '../types/user'
import { collection } from './database'

export type Payload<K extends ClientMessage['type']> = {
  message: Extract<ClientMessage, { type: K }>
  send: Send
  userId: ObjectId
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
  void collection('users').then(_ =>
    _.findOne(userId).then(failOn<User>(isNil, 'user not found')).then(field('lastDocument'))
  )
})
