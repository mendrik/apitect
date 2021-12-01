import { createEvent, createStore } from 'effector'
import { omit, pipe, prop, propEq } from 'ramda'
import { included } from 'ramda-adjunct'
import { Document } from 'shared/types/domain/document'
import { v4 as uuid } from 'uuid'

import { apiResponse, socketEstablished } from '../events/messages'
import { resetStore } from '../events/project'
import {
  createNodeFx,
  deleteNodeFx,
  openNodeState,
  projectFx,
  selectNode,
  updateNodeSettingsFx
} from '../events/tree'
import { TreeNode } from '../shared/algebraic/treeNode'
import { ApiSchema } from '../shared/api'
import { ApiError, ApiResponse } from '../shared/apiResponse'
import { Api, ApiMethod } from '../shared/types/api'
import { ZApiRequest } from '../shared/types/apiRequest'
import { Node } from '../shared/types/domain/node'
import { Tag } from '../shared/types/domain/tag'
import { NodeSettings } from '../shared/types/forms/nodetypes/nodeSettings'
import { Maybe } from '../shared/types/generic'
import { logger } from '../shared/utils/logger'
import { byProp } from '../shared/utils/ramda'

export type AppState = {
  document: Omit<Document, 'tree'>
  tree: Node
  tags: Tag[]
  visibleTags: Tag[]
  selectedNode: Maybe<TreeNode<Node>>
  openNodes: Record<string, boolean>
  nodeSettings: Record<string, NodeSettings>
  api: Api
}

const initial: AppState = {
  document: null,
  tree: null,
  openNodes: {},
  tags: [],
  visibleTags: [],
  selectedNode: null
} as any

const $appStore = createStore<AppState>(initial)
export const updateState = createEvent<Partial<AppState>>()
$appStore.on(updateState, (state, cur) => ({ ...state, ...cur }))

apiResponse.watch(data => {
  if (isError(data)) {
    logger.error(`Res[${data.status}]: ${data.message}`)
  } else {
    logger.debug(`Res[${data.method}]:`, data.payload)
  }
})

const uiTree = (root: Node) => TreeNode.from<Node, 'children'>('children')(root)

const selectedNodeState = (
  state: AppState,
  selectedNode: Maybe<TreeNode<Node>>
): Partial<AppState> =>
  selectedNode
    ? {
        selectedNode,
        openNodes: {
          ...state.openNodes,
          ...selectedNode?.pathToRoot().reduce((p, c) => ({ ...p, [c.id]: true }), {})
        }
      }
    : { ...state, selectedNode: undefined }

$appStore.on(deleteNodeFx.done, (state, { result }) => {
  const uiRoot = uiTree(result.tree)
  const parent = uiRoot.first(propEq('id', result.parentNode))
  const node = parent?.children[result.position - 1] ?? parent
  return { ...state, tree: result.tree, ...selectedNodeState(state, node) }
})

$appStore.on(projectFx.done, (state, { result }) => {
  const tree = result.document.tree
  return {
    ...state,
    document: omit(['tree'], result.document),
    nodeSettings: byProp('nodeId', result.nodeSettings),
    tree: tree,
    tags: result.tags,
    visibleTags: result.tags.filter(pipe(prop('name'), included(result.visibleTags))),
    openNodes: {
      ...state.openNodes,
      [tree.id]: true
    }
  }
})

$appStore.on(createNodeFx.done, (state, { result }) => {
  const uiRoot = uiTree(result.tree)
  const node = uiRoot.first(propEq('id', result.nodeId))
  return { ...state, tree: result.tree, ...selectedNodeState(state, node) }
})

$appStore.on(updateNodeSettingsFx.done, (state, { result }) => {
  return { ...state, tree: result }
})

const isError = (res: ApiResponse | ApiError): res is ApiError =>
  'error' in res && res.error === 'error'

$appStore.on(socketEstablished, (state, sendJsonMessage) => ({
  ...state,
  api: new Proxy({} as any, {
    get(target, method: ApiMethod) {
      return <T>(payload: T) => {
        if (method in ApiSchema) {
          const id = uuid()
          try {
            const apiCall = ZApiRequest.parse({
              id,
              method,
              payload
            })
            logger.info(`Sent: ${method}`, apiCall.payload)
            sendJsonMessage(apiCall)
          } catch (e) {
            logger.error('Failed to parse ApiRequest', e)
          }
          return new Promise((resolve, reject) => {
            const unsubscribe = apiResponse.watch(res => {
              if (res.id === id) {
                unsubscribe()
                if (isError(res)) {
                  reject(res)
                } else {
                  resolve(res.payload)
                }
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
  ...selectedNodeState(state, selectedNode)
}))

$appStore.on(openNodeState, (state, [node, open]) => ({
  ...state,
  openNodes: { ...state.openNodes, [node.value.id]: open }
}))

$appStore.reset(resetStore)

export default $appStore
