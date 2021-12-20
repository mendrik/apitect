import { createStore, sample } from 'effector'
import { always, cond, identity, isNil, pathEq, T } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Fn } from '~shared/types/generic'
import { $currentNode } from '~stores/$selectedNode'

export const $selectedArrayItem = createStore(null)
export const $selectedArrayNode = createStore<TreeNode<Node> | null>(null)

const isArray = pathEq(['value', 'nodeType'], NodeType.Array)
sample({
  source: $currentNode,
  fn: cond([
    [isNil, always(null)],
    [isArray, identity],
    [T, (node: TreeNode<Node>) => node.$pathToRoot().find(isArray) ?? null]
  ]) as Fn<TreeNode<Node> | null>,
  target: $selectedArrayNode
})
