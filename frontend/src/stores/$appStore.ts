import { createStore } from 'effector-logger'
import { omit, propEq } from 'ramda'
import { UiDocument } from 'shared/types/domain/document'

import { messageReceived, socketEstablished } from '../events/messages'
import { deleteNode, deselectNode, openNodeState, selectNode } from '../events/tree'
import { TreeNode } from '../shared/algebraic/treeNode'
import { ClientMessage } from '../shared/types/clientMessages'
import { UiNode } from '../shared/types/domain/tree'
import { Maybe } from '../shared/types/generic'

type AppState = {
  document: Omit<UiDocument, 'tree'>
  tree: UiNode
  selectedNode: Maybe<UiNode>
  sendMessage: <T extends ClientMessage>(message: T) => void
  openNodes: Record<string, boolean>
}

const initial: AppState = {
  document: null,
  tree: null,
  openNodes: {}
} as any

const $appStore = createStore<AppState>(initial)

const uiTree = (root: UiNode) => TreeNode.from<UiNode, 'children'>('children')(root)

$appStore.on(messageReceived, (state, message) => {
  switch (message.type) {
    case 'DOCUMENT':
      return {
        ...state,
        document: omit(['tree'], message.payload),
        tree: message.payload.tree,
        openNodes: { ...state.openNodes, [message.payload.tree.id]: true }
      }
    case 'RESET':
      return initial
    case 'NODE_CREATED': {
      const uiRoot = uiTree(state.tree)
      const node = uiRoot.first(propEq('id', message.payload))
      selectNode(node?.value)
      return state
    }
    case 'NODE_DELETED': {
      const uiRoot = uiTree(state.tree)
      const parent = uiRoot.first(propEq('id', message.payload.parentNode))?.children[
        message.payload.position - 1
      ]
      selectNode(parent?.value)
      return state
    }
    default:
      return state
  }
})

$appStore.on(socketEstablished, (state, sendJsonMessage) => ({
  ...state,
  sendMessage: sendJsonMessage
}))

const send =
  <T>(fn: (payload: NonNullable<T>) => ClientMessage) =>
  (state: AppState, payload: T) => {
    if (payload != null) {
      state.sendMessage(fn(payload!))
    }
    return state
  }

$appStore.on(selectNode, (state, selectedNode) => {
  const openNodes = uiTree(state.tree)
    .first(propEq<any>('id', selectedNode?.id))
    ?.pathToRoot()
    .reduce((p, c) => ({ ...p, [c.id]: true }), {})
  return {
    ...state,
    selectedNode: selectedNode ? { ...selectedNode } : undefined,
    openNodes: { ...state.openNodes, ...openNodes }
  }
})
$appStore.on(deselectNode, state => ({ ...state, selectedNode: undefined }))
$appStore.on(openNodeState, (state, [node, open]) => ({
  ...state,
  openNodes: { ...state.openNodes, [node.id]: open }
}))
$appStore.on(
  deleteNode,
  send(node => ({ type: 'DEL_NODE', id: node.id }))
)

export default $appStore
