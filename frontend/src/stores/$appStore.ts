import { createStore } from 'effector'
import { omit, propEq } from 'ramda'
import { Document } from 'shared/types/domain/document'

import { messageReceived, socketEstablished } from '../events/messages'
import { deleteNode, openNodeState, selectNode } from '../events/tree'
import { TreeNode } from '../shared/algebraic/treeNode'
import { ClientMessage } from '../shared/types/clientMessages'
import { Node } from '../shared/types/domain/tree'
import { Maybe } from '../shared/types/generic'
import { logger } from '../shared/utils/logger'

type AppState = {
  document: Omit<Document, 'tree'>
  tree: Node
  selectedNode: Maybe<Node>
  sendMessage: <T extends ClientMessage>(message: T) => void
  openNodes: Record<string, boolean>
}

const initial: AppState = {
  document: null,
  tree: null,
  openNodes: {}
} as any

const $appStore = createStore<AppState>(initial)

const uiTree = (root: Node) => TreeNode.from<Node, 'children'>('children')(root)

messageReceived.watch(payload => {
  logger.debug(`Message: ${payload.type}`, payload)
})

const selectedNodeState = (state: AppState, selectedNode: Maybe<Node>) =>
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
    : { ...state, selectedNode: undefined }

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
      const node = uiRoot.first(propEq('id', message.payload.id))
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
$appStore.on(openNodeState, (state, [node, open]) => ({
  ...state,
  openNodes: { ...state.openNodes, [node.id]: open }
}))
$appStore.on(
  deleteNode,
  send(node => ({ type: 'DEL_NODE', id: node.id }))
)

export default $appStore
