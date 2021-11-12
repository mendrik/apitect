import { eventMap, serverState } from '../services'

serverState.on(eventMap.NODE_SETTINGS, (state, { send, email, message }) => {})
