import { createStore, sample } from 'effector'
import { propEq } from 'ramda'
import { isNotNil } from 'ramda-adjunct'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Fn } from '~shared/types/generic'
import { $selectedNode } from '~stores/$selectedNode'

const isArray: Fn<boolean> = propEq('nodeType', NodeType.Array)

export const $selectedArrayNode = createStore<TreeNode<Node> | null>(null)
export const $arrayDrawerOpen = $selectedArrayNode.map(isNotNil)

sample({
  source: $selectedNode,
  fn: node => (isArray(node?.value ?? {}) ? node : node?.closest(isArray)) ?? null,
  target: $selectedArrayNode
})
