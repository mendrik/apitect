import { createStore } from 'effector'
import { nthArg } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'

import { resetProject } from '../events/reset'
import { selectNode } from '../events/tree'

export const $selectedNode = createStore<TreeNode<Node> | null>(null)
  .on(selectNode, nthArg(1))
  .reset(resetProject)
