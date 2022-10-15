import { createStore, sample } from 'effector'
import { cond, nthArg, T } from 'ramda'
import { isNotNil } from 'ramda-adjunct'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { TypeOfSources } from '~shared/types/effector'
import { matchesArr } from '~shared/utils/ramda'
import { $selectedValueNode } from '~stores/$valuesStore'
import { $visibleNodes } from '~stores/$visibileNodes'

import { canHaveChildrenNodes } from '../constants'
import { resetProject } from '../events/reset'
import { selectNode } from '../events/tree'
import { selectValue } from '../events/values'

export const $selectedNode = createStore<TreeNode<Node> | null>(null)
  .on(selectNode, nthArg(1))
  .on(selectValue, () => null)
  .reset(resetProject)

export const $selectedRow = createStore<number | null>(null)

type Stores = [typeof $selectedNode, typeof $selectedValueNode, typeof $visibleNodes]
type StoresTypes = TypeOfSources<Stores>

const nodeId =
  (idx: 0 | 1) =>
  (args: StoresTypes): number =>
    args[2].indexOf(args[idx]!.extract().id)

/**
 * Get current table row from either selected value or selected tree node
 */
sample({
  source: [$selectedNode, $selectedValueNode, $visibleNodes] as Stores,
  fn: cond<[StoresTypes], number | null>([
    [matchesArr(T, isNotNil, T), nodeId(1)],
    [matchesArr(isNotNil, T, T), nodeId(0)],
    [T, () => null]
  ]),
  target: $selectedRow
})

export const $currentNode = createStore<TreeNode<Node> | null>(null)

sample({
  source: [$selectedNode, $selectedValueNode],
  fn: ([sn, svn]) => svn ?? sn,
  target: $currentNode
})

export const $canCreateNode = createStore<boolean>(true).reset(resetProject)
export const $canCreateArray = createStore<boolean>(true).reset(resetProject)

sample({
  source: $currentNode,
  fn: node => node == null || canHaveChildrenNodes.includes(node.value.nodeType),
  target: $canCreateNode
})
