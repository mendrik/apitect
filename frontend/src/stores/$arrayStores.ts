import { createStore, sample } from 'effector'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { $selectedValueNode } from '~stores/$valuesStore'

export const $selectedArrayItem = createStore(null)
export const $selectedArrayNode = createStore<TreeNode<Node> | null>(null)

sample({
  source: $selectedValueNode,
  fn: node => node?.$pathToRoot().find(n => n.value.nodeType === NodeType.Array) ?? null,
  target: $selectedArrayNode
})
