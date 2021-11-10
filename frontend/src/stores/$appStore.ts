import { createStore } from 'effector'
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

messageReceived.watch(payload => {
  console.log(`Message: ${payload.type}`, payload)
})

const selectedNodeState = (state: AppState, selectedNode: Maybe<UiNode>) =>
  selectedNode
    ? {
        selectedNode,
        openNodes: {
          ...state.openNodes,
          ...uiTree(state.tree)
            .first(propEq<any>('id', selectedNode.id))
            ?.pathToRoot()
            .reduce((p, c) => ({ ...p, [c.id]: true }), {})
        }
      }
    : state

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
      return { ...state, ...selectedNodeState(state, node?.value) }
    }
    case 'NODE_DELETED': {
      const uiRoot = uiTree(state.tree)
      const parent = uiRoot.first(propEq('id', message.payload.parentNode))
      const node = parent?.children[message.payload.position - 1] ?? parent
      return { ...state, ...selectedNodeState(state, node?.value) }
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

$appStore.on(selectNode, (state, selectedNode) => ({
  ...state,
  ...selectedNodeState(state, selectedNode!)
}))
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
