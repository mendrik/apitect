import { createStore, sample } from 'effector'
import { nthArg, propEq } from 'ramda'
import { isNotNil } from 'ramda-adjunct'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Fn } from '~shared/types/generic'
import { $selectedNode } from '~stores/$selectedNode'

import { creatingNewArrayItem } from '../events/array'
import { resetProject } from '../events/reset'

const isArray: Fn<boolean> = propEq('nodeType', NodeType.Array)

export const $selectedArrayNode = createStore<TreeNode<Node> | null>(null).reset(resetProject)
export const $arrayDrawerOpen = $selectedArrayNode.map(isNotNil)

export const $creatingNewArrayItem = createStore<boolean>(false)
  .on(creatingNewArrayItem, nthArg(1))
  .reset(resetProject)

sample({
  source: $selectedNode,
  fn: node => (isArray(node?.value ?? {}) ? node : node?.closest(isArray)) ?? null,
  target: $selectedArrayNode
})
