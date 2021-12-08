import { createEvent, createStore, sample } from 'effector'
import { isNil, prop, propEq, unless } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { ApiResult } from '~shared/types/api'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { byProp } from '~shared/utils/ramda'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'
import { createNodeFx, deleteNodeFx, selectNode, updateNodeSettingsFx } from '../events/tree'

const rawTreeCreateNode = createEvent<ApiResult<'nodeCreate'>>()
const treeCreateNode = createEvent<ApiResult<'nodeCreate'>>()

const $rawTree = createStore<Node>({
  nodeType: NodeType.Object,
  id: '',
  children: [],
  name: 'root'
})
  .on(projectFx.doneData, (state, result) => result.document.tree)
  .on(deleteNodeFx.doneData, (state, result) => result.tree)
  .on(rawTreeCreateNode, (state, result) => result.tree)
  .on(updateNodeSettingsFx.doneData, (state, result) => result)
  .reset(resetProject)

export const $treeStore = $rawTree.map(unless(isNil, TreeNode.from<Node, 'children'>('children')))

export const $mappedNodesStore = $treeStore.map<Record<NodeId, Node>>(root =>
  byProp<Node, 'id'>('id')(root.flatten().map(prop('value')))
)

sample({
  source: $treeStore,
  clock: treeCreateNode,
  fn: (state, result) => state.first(propEq('id', result.nodeId)) ?? null,
  target: selectNode
})

sample({
  source: $treeStore,
  clock: deleteNodeFx.doneData,
  fn: (state, result) => {
    const parent = state.first(propEq('id', result.parentNode))
    return parent?.children[result.position - 1] ?? parent ?? null
  },
  target: selectNode
})

sample({
  clock: createNodeFx.doneData,
  target: [rawTreeCreateNode, treeCreateNode]
})
