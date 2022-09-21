import { createStore, sample } from 'effector'
import { always, cond, identity, isNil, pathEq, T } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { $currentNode } from '~stores/$selectedNode'

type OptNode = TreeNode<Node> | null

export const $selectedArrayNode = createStore<OptNode>(null)

const isArrayNode = pathEq(['value', 'nodeType'], NodeType.Array)
sample({
  source: $currentNode,
  fn: cond([
    [isNil, always(null)],
    [isArrayNode, identity],
    [T, node => node!.$pathToRoot().find(isArrayNode) ?? null]
  ]),
  target: $selectedArrayNode
})
