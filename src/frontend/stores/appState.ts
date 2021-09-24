import { createStore } from 'effector'

import { messageReceived } from '../hooks/useWebsocket'

const initial = {}

type AppState = typeof initial

const appState = createStore<AppState>(initial)

appState.on(messageReceived, (state, payload) => {
  switch (payload.type) {
    case 'HELLO':
      console.log(payload.message)
      return state
    default:
      return state
  }
})

export default appState
