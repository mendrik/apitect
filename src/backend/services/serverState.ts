import { createEvent, createStore, Event } from 'effector'
import { SocketStream } from 'fastify-websocket'

import { ClientMessage } from '../../shared/types/messages'
import { Send } from '../server'

type EventMap<K = ClientMessage['type'], V = Extract<ClientMessage, { type: K }>> = Record<
  Lowercase<K & string>,
  OmitThisParameter<Event<{ message: V; send: Send }>>
>

type ServerState = {
  authorizedConnections: WeakMap<SocketStream, boolean>
}

export const eventMap: EventMap = {
  authorize: createEvent('authorize'),
  node: createEvent('node'),
  project: createEvent('project')
}

export const state = createStore<ServerState>({
  authorizedConnections: new WeakMap<SocketStream, boolean>()
})

type X = typeof eventMap.authorize

state.on(eventMap.authorize, (state, { message: {}, send }) => {
  send({})
})
