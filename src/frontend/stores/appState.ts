import { createStore } from 'effector'

import { messageReceived } from '../hooks/useWebsocket'

const initial = {
  click: 0
}

type AppState = typeof initial

const appState = createStore<AppState>(initial)

appState.on(messageReceived, (state, payload) => {
  switch (payload.type) {
    case 'HELLO':
      return { ...state, click: state.click + 1 }
    default:
      return state
  }
})

export default appState
