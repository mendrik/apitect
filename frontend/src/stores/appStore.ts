import { createStore } from 'effector'
import { omit } from 'ramda'
import { UiDocument } from 'shared/types/domain/document'

import { VisualNode } from '../components/specific/VisualNodeTemplate'
import { messageReceived } from '../events/messages'
import { deselectNode, selectNode } from '../events/tree'
import { UiNode } from '../shared/types/domain/tree'

type AppState = {
  document: Omit<UiDocument, 'tree'>
  tree: UiNode
  selectedNode?: VisualNode
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

appStore.on(selectNode, (state, selectedNode) => ({ ...state, selectedNode }))
appStore.on(deselectNode, state => ({ ...state, selectedNode: undefined }))

export default appStore
