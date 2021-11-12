import { createStore } from 'effector'
import { omit, propEq } from 'ramda'
import { Document } from 'shared/types/domain/document'
import { v4 as uuid } from 'uuid'

import { apiResponse, socketEstablished } from '../events/messages'
import { openNodeState, selectNode } from '../events/tree'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Api, ApiSchema } from '../shared/api'
import { ApiRequest } from '../shared/types/apiCall'
import { Node } from '../shared/types/domain/tree'
import { Maybe } from '../shared/types/generic'
import { logger } from '../shared/utils/logger'

type AppState = {
  document: Omit<Document, 'tree'>
  tree: Node
  selectedNode: Maybe<Node>
  openNodes: Record<string, boolean>
  api: Api
}

const initial: AppState = {
  document: null,
  tree: null,
  openNodes: {}
} as any

const $appStore = createStore<AppState>(initial)

const uiTree = (root: Node) => TreeNode.from<Node, 'children'>('children')(root)

apiResponse.watch(payload => {
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

$appStore.on(apiResponse, (state, message) => {
  switch (message.type) {
    case 'DOCUMENT':
      const tree = message.payload.tree
      const uiRoot = uiTree(tree)
      return {
        ...state,
        document: omit(['tree'], message.payload),
        tree: tree,
        openNodes: {
          ...state.openNodes,
          [tree.id]: true
        },
        selectedNode: uiRoot.first(propEq('id', state.selectedNode?.id))?.value
      }
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
  api: new Proxy({} as any, {
    get(target, method: keyof ApiSchema) {
      return function (input: any) {
        if (method in ApiSchema) {
          const apiCall: ApiRequest = {
            id: uuid(),
            input,
            method
          }
          sendJsonMessage(apiCall)
        } else {
          logger.error(`No ${method} in ApiSchema`, {})
        }
      }
    }
  })
}))

$appStore.on(selectNode, (state, selectedNode) => ({
  ...state,
  ...selectedNodeState(state, selectedNode!)
}))

$appStore.on(openNodeState, (state, [node, open]) => ({
  ...state,
  openNodes: { ...state.openNodes, [node.id]: open }
}))

export default $appStore
