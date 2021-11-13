import { createEvent, createStore } from 'effector'
import { omit, propEq } from 'ramda'
import { Document } from 'shared/types/domain/document'
import { v4 as uuid } from 'uuid'

import { apiResponse, socketEstablished } from '../events/messages'
import {
  createNodeFx,
  deleteNodeFx,
  documentFx,
  openNodeState,
  selectNode,
  updateNodeSettingsFx
} from '../events/tree'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Api, ApiMethod, ApiSchema } from '../shared/api'
import { decode } from '../shared/codecs/decode'
import { TApiRequest } from '../shared/types/apiRequest'
import { Node } from '../shared/types/domain/tree'
import { Maybe } from '../shared/types/generic'
import { logger } from '../shared/utils/logger'

export type AppState = {
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
export const updateState = createEvent<Partial<AppState>>()
$appStore.on(updateState, (state, cur) => ({ ...state, ...cur }))

apiResponse.watch(({ method, payload }) => {
  logger.debug(`Message: ${method}`, payload)
})

const uiTree = (root: Node) => TreeNode.from<Node, 'children'>('children')(root)

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

$appStore.on(deleteNodeFx.done, (state, { result }) => {
  const uiRoot = uiTree(state.tree)
  const parent = uiRoot.first(propEq('id', result.parentNode))
  const node = parent?.children[result.position - 1] ?? parent
  return { ...state, tree: result.tree, ...selectedNodeState(state, node?.value) }
})

$appStore.on(documentFx.done, (state, { result }) => {
  const tree = result.tree
  const uiRoot = uiTree(tree)
  return {
    ...state,
    document: omit(['tree'], result),
    tree: tree,
    openNodes: {
      ...state.openNodes,
      [tree.id]: true
    },
    selectedNode: uiRoot.first(propEq('id', state.selectedNode?.id))?.value
  }
})

$appStore.on(createNodeFx.done, (state, { result }) => {
  const uiRoot = uiTree(result.tree)
  const node = uiRoot.first(propEq('id', result.nodeId))
  return { ...state, tree: result.tree, ...selectedNodeState(state, node?.value) }
})

$appStore.on(updateNodeSettingsFx.done, (state, { result }) => {
  return { ...state, tree: result }
})

$appStore.on(socketEstablished, (state, sendJsonMessage) => ({
  ...state,
  api: new Proxy({} as any, {
    get(target, method: ApiMethod) {
      return <T>(payload: T) => {
        if (method in ApiSchema) {
          logger.info(`Sent: ${method}`, payload)
          const id = uuid()
          const apiCall = decode(TApiRequest)({
            id,
            method,
            payload
          })
          sendJsonMessage(apiCall)
          return new Promise(resolve => {
            const unsubscribe = apiResponse.watch(res => {
              if (res.id === id) {
                unsubscribe()
                resolve(res.payload)
              }
            })
          })
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
