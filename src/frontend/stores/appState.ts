import { createStore } from 'effector'

import { messageReceived } from '../events/messages'

const initial = {}

type AppState = typeof initial

const appState = createStore<AppState>(initial)

appState.on(messageReceived, (state, payload) => {
  switch (payload.type) {
    case 'PROJECT':
      console.log(payload)
      return state
    default:
      return state
  }
})

export default appState
