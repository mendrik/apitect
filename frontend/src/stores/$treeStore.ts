import { createStore, sample, Store } from 'effector'
import { isNil, prop, propEq, unless } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { mapByProperty } from '~shared/utils/ramda'
import { throwError } from '~shared/utils/throwError'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'
import {
  createNodeFx,
  deleteNodeFx,
  focusNode,
  selectNode,
  updateNodeSettingsFx
} from '../events/tree'

const $rawTree = createStore<Node>({
  nodeType: NodeType.Object,
  id: '',
  children: [],
  name: 'root'
})
  .on(projectFx.doneData, (state, result) => result.document.tree)
  .on(deleteNodeFx.doneData, (state, result) => result.tree)
  .on(createNodeFx.doneData, (state, result) => result.tree)
  .on(updateNodeSettingsFx.doneData, (state, result) => result)
  .reset(resetProject)

export const $treeStore: Store<TreeNode<Node>> = $rawTree.map(
  unless(isNil, TreeNode.from<Node, 'children'>('children'))
)

export const $mappedNodesStore = $treeStore.map<Record<NodeId, Node>>(root =>
  mapByProperty('id')(root.flatten().map(prop('value')))
)

/**
 * After node has been created select it
 */
sample({
  clock: createNodeFx.doneData,
  source: $treeStore,
  fn: (rootNode, result) =>
    rootNode.first(propEq('id', result.nodeId)) ?? throwError('no node after creation?!'),
  target: [selectNode, focusNode]
})

/**
 * After node has been deleted select previous sibling, or parent, or nothing
 */
sample({
  clock: deleteNodeFx.doneData,
  source: $treeStore,
  fn: (rootNode, result) => {
    const parent = rootNode.first(propEq('id', result.parentNode))
    return parent?.children[result.position - 1] ?? parent ?? null
  },
  target: [selectNode, focusNode]
})
