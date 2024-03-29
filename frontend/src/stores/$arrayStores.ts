import { createStore, sample } from 'effector'
import { always, cond, identity, ifElse, isNil, pathEq, T } from 'ramda'
import { NodeType } from '~shared/types/domain/nodeType'
import { OptNode } from '~shared/types/generic'
import { $canCreateArray, $currentNode } from '~stores/$selectedNode'

export const $selectedArrayNode = createStore<OptNode>(null)

const isArrayNode = pathEq(['value', 'nodeType'], NodeType.Array)

export const getArrayNode: (node: OptNode) => OptNode = ifElse(
  isArrayNode,
  identity,
  (node: OptNode) => node?.$pathToRoot().find(isArrayNode) ?? null
)

/**
 * Compute the first array node for a given current node
 */
sample({
  source: $currentNode,
  fn: cond<[OptNode], OptNode>([
    [isNil, always(null)],
    [isArrayNode, identity],
    [T, getArrayNode]
  ]),
  target: $selectedArrayNode
})

sample({
  source: $selectedArrayNode,
  fn: node => node == null,
  target: $canCreateArray
})
