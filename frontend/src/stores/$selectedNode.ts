import { createStore, sample, Store } from 'effector'
import { nthArg } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node, NodeId } from '~shared/types/domain/node'
import { $selectedValueNode } from '~stores/$valuesStore'
import { $visibleNodes } from '~stores/$visibileNodes'

import { canHaveChildrenNodes } from '../constants'
import { resetProject } from '../events/reset'
import { selectNode } from '../events/tree'

export const $selectedNode = createStore<TreeNode<Node> | null>(null)
  .on(selectNode, nthArg(1))
  .reset(resetProject)

export const $selectedRow = createStore<number | null>(null)

sample({
  source: [$selectedNode, $selectedValueNode, $visibleNodes] as [
    typeof $selectedNode,
    typeof $selectedNode,
    typeof $visibleNodes
  ],
  fn: ([sv, svn, vn]) =>
    svn != null ? vn.indexOf(svn.extract().id) : sv != null ? vn.indexOf(sv.extract().id) : null,
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
