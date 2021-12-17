import { createStore, sample } from 'effector'
import { nthArg, propEq } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Fn } from '~shared/types/generic'

import { resetProject } from '../events/reset'
import { selectNode } from '../events/tree'

const isArray: Fn<boolean> = propEq('nodeType', NodeType.Array)

export const $selectedNode = createStore<TreeNode<Node> | null>(null)
  .on(selectNode, nthArg(1))
  .reset(resetProject)

export const $selectedArrayNode = createStore<TreeNode<Node> | null>(null)

export const $canCreateNode = createStore<boolean>(true).reset(resetProject)

sample({
  source: $selectedNode,
  fn: node => (isArray(node?.value ?? {}) ? node : node?.closest(isArray)) ?? null,
  target: $selectedArrayNode
})

sample({
  source: $selectedNode,
  fn: node => node == null || [NodeType.Array, NodeType.Object].includes(node.value.nodeType),
  target: $canCreateNode
})
