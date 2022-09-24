import { createStore, sample } from 'effector'
import { TypeOfSource } from 'effector/effector.cjs'
import { cond, nthArg, T } from 'ramda'
import { isNotNil } from 'ramda-adjunct'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { matchesArr } from '~shared/utils/ramda'
import { $selectedValueNode } from '~stores/$valuesStore'
import { $visibleNodes } from '~stores/$visibileNodes'

import { canHaveChildrenNodes } from '../constants'
import { resetProject } from '../events/reset'
import { selectNode } from '../events/tree'

export const $selectedNode = createStore<TreeNode<Node> | null>(null)
  .on(selectNode, nthArg(1))
  .reset(resetProject)

export const $selectedRow = createStore<number | null>(null)

type s1 = typeof $selectedNode
type s2 = typeof $selectedValueNode
type s3 = typeof $visibleNodes
type t1 = TypeOfSource<s1>
type t2 = TypeOfSource<s2>
type t3 = TypeOfSource<s3>

sample({
  source: [$selectedNode, $selectedValueNode, $visibleNodes] as [s1, s2, s3],
  fn: cond<[[t1, t2, t3]], number | null>([
    [matchesArr(T, isNotNil, T), ([_, svn, vn]) => vn.indexOf(svn!.extract().id)],
    [matchesArr(isNotNil, T, T), ([sv, _, vn]) => vn.indexOf(sv!.extract().id)],
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

sample({
  source: $currentNode,
  fn: node => node == null || canHaveChildrenNodes.includes(node.value.nodeType),
  target: $canCreateNode
})
