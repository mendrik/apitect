import { createStore, sample } from 'effector'
import { nthArg } from 'ramda'
import { NodeType } from '~shared/types/domain/nodeType'
import { $selectedNode } from '~stores/$selectedNode'

import { arrayDrawerState } from '../events/array'
import { resetProject } from '../events/reset'

export const $arrayDrawer = createStore<boolean>(false)
  .on(arrayDrawerState, nthArg(1))
  .reset(resetProject)

sample({
  source: $selectedNode,
  fn: node =>
    node?.value.nodeType === NodeType.Array ||
    node?.closest(n => n.nodeType === NodeType.Array) != null,
  target: arrayDrawerState
})
