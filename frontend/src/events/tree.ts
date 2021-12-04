import { createEffect, createEvent, sample } from 'effector'
import { tap } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Api } from '~shared/types/api'
import { Node } from '~shared/types/domain/node'
import { Maybe } from '~shared/types/generic'
import { ModalNames } from '~shared/types/modals'

import { $api } from '../stores/$apiStore'
import { openModal } from './modals'

export const openNodeState = createEvent<[TreeNode<Node>, boolean]>('toggle node')
export const openNode = (node: Maybe<TreeNode<Node>>) =>
  node ? openNodeState([node, true]) : void 0
export const closeNode = (node: Maybe<TreeNode<Node>>) =>
  node ? openNodeState([node, false]) : void 0
export const selectNode = createEvent<TreeNode<Node> | null>('select node')

const api = () => sample($api).getState()

export const createNodeFx = createEffect<Api['nodeCreate']>(node => api().nodeCreate(node))
export const deleteNodeFx = createEffect<Api['nodeDelete']>(id => api().nodeDelete(id))
export const updateNodeSettingsFx = createEffect<Api['updateNodeSettings']>(settings =>
  api().updateNodeSettings(settings)
)

export const nodeSettingsFx = createEffect<Api['nodeSettings']>(id =>
  api()
    .nodeSettings(id)
    .then(tap(params => openModal({ name: ModalNames.NODE_SETTINGS, params })))
)

export const newNodeFx = createEffect((selectedNode?: Node) =>
  openModal({ name: ModalNames.NEW_NODE, params: { selectedNode } })
)
