import { createStore } from 'effector'
import { UiDocument } from 'shared/types/domain/document'
import { Maybe } from 'shared/types/generic'

import { messageReceived } from '../events/messages'

type AppState = {
  document: Maybe<UiDocument>
}

const initial: AppState = {
  document: null
}

const appStore = createStore<AppState>(initial)

appStore.on(messageReceived, (state, message) => {
  switch (message.type) {
    case 'DOCUMENT':
      return { ...state, document: message.payload }
    case 'RESET':
      return initial
    default:
      return state
  }
})

export default appStore
