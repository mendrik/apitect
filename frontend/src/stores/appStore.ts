import { createStore } from 'effector'
import { omit } from 'ramda'
import { UiDocument } from 'shared/types/domain/document'

import { messageReceived } from '../events/messages'
import { UiNode } from '../shared/types/domain/tree'

type AppState = {
  document: Omit<UiDocument, 'tree'>
  tree: UiNode
}

const initial: AppState = {
  document: null,
  tree: null
} as any

const appStore = createStore<AppState>(initial)

appStore.on(messageReceived, (state, message) => {
  switch (message.type) {
    case 'DOCUMENT':
      return { ...state, document: omit(['tree'], message.payload), tree: message.payload.tree }
    case 'RESET':
      return initial
    default:
      return state
  }
})

export default appStore
