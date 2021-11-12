import { createStore } from 'effector'
import { omit, propEq } from 'ramda'
import { Document } from 'shared/types/domain/document'
import { v4 as uuid } from 'uuid'

import { apiResponse, socketEstablished } from '../events/messages'
import { openNodeState, selectNode } from '../events/tree'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Api, ApiMethod, ApiSchema } from '../shared/api'
import { decode } from '../shared/codecs/decode'
import { TApiRequest } from '../shared/types/apiRequest'
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

apiResponse.watch(({ method, payload }) => {
  logger.debug(`Message: ${method}`, payload)
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

$appStore.on(apiResponse, (state, res) => {
  switch (res.method) {
    case 'document':
      const tree = res.payload.tree
      const uiRoot = uiTree(tree)
      return {
        ...state,
        document: omit(['tree'], res.payload),
        tree: tree,
        openNodes: {
          ...state.openNodes,
          [tree.id]: true
        },
        selectedNode: uiRoot.first(propEq('id', state.selectedNode?.id))?.value
      }
    case 'nodeCreate': {
      const uiRoot = uiTree(state.tree)
      const node = uiRoot.first(propEq('id', res.payload.id))
      return { ...state, ...selectedNodeState(state, node?.value) }
    }
    case 'nodeDelete': {
      const uiRoot = uiTree(state.tree)
      const parent = uiRoot.first(propEq('id', res.payload.parentNode))
      const node = parent?.children[res.payload.position - 1] ?? parent
      return { ...state, ...selectedNodeState(state, node?.value) }
    }
    default:
      return state
  }
})

$appStore.on(socketEstablished, (state, sendJsonMessage) => ({
  ...state,
  api: new Proxy({} as any, {
    get(target, method: ApiMethod) {
      return <T>(input: T) => {
        if (method in ApiSchema) {
          const apiCall = decode(TApiRequest)({
            id: uuid(),
            method,
            input
          })
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
