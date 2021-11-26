import { createEffect, createEvent, sample } from 'effector'
import { tap } from 'ramda'

import { TreeNode } from '../shared/algebraic/treeNode'
import { Api } from '../shared/api'
import { Node } from '../shared/types/domain/node'
import { Maybe } from '../shared/types/generic'
import { ModalNames } from '../shared/types/modals'
import $appStore from '../stores/$appStore'
import { openModal } from './modals'

export const openNodeState = createEvent<[TreeNode<Node>, boolean]>('toggle node')
export const openNode = (node: Maybe<TreeNode<Node>>) =>
  node ? openNodeState([node, true]) : void 0
export const closeNode = (node: Maybe<TreeNode<Node>>) =>
  node ? openNodeState([node, false]) : void 0
export const selectNode = createEvent<Maybe<TreeNode<Node>>>('select node')

const state = () => sample($appStore).getState()

export const createNodeFx = createEffect<Api['nodeCreate']>(node => state().api.nodeCreate(node))
export const deleteNodeFx = createEffect<Api['nodeDelete']>(id => state().api.nodeDelete(id))
export const projectFx = createEffect<Api['project']>(() => state().api.project())
export const updateNodeSettingsFx = createEffect<Api['updateNodeSettings']>(settings =>
  state().api.updateNodeSettings(settings)
)

export const nodeSettingsFx = createEffect<Api['nodeSettings']>(id =>
  state()
    .api.nodeSettings(id)
    .then(tap(params => openModal({ name: ModalNames.NODE_SETTINGS, params })))
)

export const newNodeFx = createEffect((selectedNode?: Node) =>
  openModal({ name: ModalNames.NEW_NODE, params: { selectedNode } })
)
