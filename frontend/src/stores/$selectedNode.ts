import { createStore, sample } from 'effector'
import { nthArg } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'

import { canHaveChildrenNodes } from '../constants'
import { resetProject } from '../events/reset'
import { selectNode } from '../events/tree'

export const $selectedNode = createStore<TreeNode<Node> | null>(null)
  .on(selectNode, nthArg(1))
  .reset(resetProject)

export const $canCreateNode = createStore<boolean>(true).reset(resetProject)

sample({
  source: $selectedNode,
  fn: node => node == null || canHaveChildrenNodes.includes(node.value.nodeType),
  target: $canCreateNode
})
