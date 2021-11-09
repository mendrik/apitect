import { eventMap, serverState } from './serverState'

serverState.on(eventMap.NEW_NODE, (state, { send, userId, message }) => {})
