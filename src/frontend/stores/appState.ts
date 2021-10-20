import { createStore } from 'effector'

import { Document } from '../../shared/types/domain/document'
import { Maybe } from '../../shared/types/generic'
import { messageReceived } from '../events/messages'

type AppState = {
  document: Maybe<Document>
}

const initial: AppState = {
  document: null
}

const appState = createStore<AppState>(initial)

appState.on(messageReceived, (state, payload) => {
  switch (payload.type) {
    case 'DOCUMENT':
      return { ...state, document: payload.document }
    case 'RESET':
      return initial
    default:
      return state
  }
})

export default appState
