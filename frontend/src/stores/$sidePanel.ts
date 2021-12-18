import { createStore, sample } from 'effector'
import { concat, flip, map, pipe, prop, without } from 'ramda'
import { propNotEq } from 'ramda-adjunct'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { $selectedValueNode } from '~stores/$valuesStore'

export const $sidePanelOpen = createStore(false)
export const $selectedNodePath = createStore<Node[]>([])

const openFor = [NodeType.Array, NodeType.Date, NodeType.Binary]

sample({
  source: $selectedValueNode,
  fn: node => (node != null ? concat([node.extract()], node.pathToRoot()) : []),
  target: $selectedNodePath
})

sample({
  source: $selectedNodePath,
  fn: pipe(map(prop('nodeType')), flip(without)(openFor), propNotEq('length', openFor.length)),
  target: $sidePanelOpen
})
