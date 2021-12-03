import { createEvent, createStore } from 'effector'
import { isNil, prop, propEq, unless } from 'ramda'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'
import { createNodeFx, deleteNodeFx, selectNode, updateNodeSettingsFx } from '../events/tree'
import { TreeNode } from '../shared/algebraic/treeNode'
import { ApiResult } from '../shared/types/api'
import { Node } from '../shared/types/domain/node'
import { NodeType } from '../shared/types/domain/nodeType'
import { byProp } from '../shared/utils/ramda'

const rawTreeCreateNode = createEvent<ApiResult<'nodeCreate'>>()
const treeCreateNode = createEvent<ApiResult<'nodeCreate'>>()

const $rawTree = createStore<Node>({
  nodeType: NodeType.Object,
  id: '',
  children: [],
  name: 'root'
})
  .on(projectFx.done, (state, { result }) => result.document.tree)
  .on(deleteNodeFx.done, (state, { result }) => result.tree)
  .on(rawTreeCreateNode, (state, result) => result.tree)
  .on(updateNodeSettingsFx.done, (state, { result }) => result)

export const $treeStore = $rawTree
  .map(unless(isNil, TreeNode.from<Node, 'children'>('children')))
  .on(treeCreateNode, (state, result) => {
    const node = state.first(propEq('id', result.nodeId)) ?? null
    selectNode(node)
  })
  .on(deleteNodeFx.done, (state, { result }) => {
    const parent = state.first(propEq('id', result.parentNode))
    const node = parent?.children[result.position - 1] ?? parent ?? null
    selectNode(node)
  })

createNodeFx.done.watch(({ result }) => {
  rawTreeCreateNode(result)
  treeCreateNode(result)
})

export const $mappedNodesStore = $treeStore.map<Record<string, Node>>(root =>
  byProp('id', root.flatten().map(prop('value')))
)

$rawTree.reset(resetProject)
