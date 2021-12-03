import { createStore } from 'effector'
import { isNil, prop, propEq, unless } from 'ramda'

import { resetProject } from '../events/reset'
import {
  createNodeFx,
  deleteNodeFx,
  projectFx,
  selectNode,
  updateNodeSettingsFx
} from '../events/tree'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Node } from '../shared/types/domain/node'
import { NodeType } from '../shared/types/domain/nodeType'
import { byProp } from '../shared/utils/ramda'

const $rawTree = createStore<Node>({
  nodeType: NodeType.Object,
  id: '',
  children: [],
  name: 'root'
})

export const $treeStore = $rawTree.map(unless(isNil, TreeNode.from<Node, 'children'>('children')))
export const $mappedNodesStore = $treeStore.map<Record<string, Node>>(root =>
  byProp('id', root.flatten().map(prop('value')))
)

$rawTree.watch(projectFx.done, (state, { result }) => result.document.tree)
$rawTree.watch(deleteNodeFx.done, (state, { result }) => result.tree)
$rawTree.watch(createNodeFx.done, (state, { result }) => result.tree)
$rawTree.watch(updateNodeSettingsFx.done, (state, { result }) => result)

$treeStore.watch(deleteNodeFx.done, (state, { result }) => {
  const parent = state.first(propEq('id', result.parentNode))
  const node = parent?.children[result.position - 1] ?? parent ?? null
  void selectNode(node)
})

$treeStore.watch(createNodeFx.done, (state, { result }) => {
  const node = state.first(propEq('id', result.nodeId)) ?? null
  void selectNode(node)
})

$rawTree.reset(resetProject)
