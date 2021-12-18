import { createStore, sample } from 'effector'
import { flip, map, pipe, prop, without } from 'ramda'
import { propNotEq } from 'ramda-adjunct'
import { Node } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'

export const $sidePanelOpen = createStore(false)
export const $selectedNodePath = createStore<Node[]>([])

const openFor = [NodeType.Array, NodeType.Date, NodeType.Binary]

sample({
  source: $selectedNodePath,
  fn: pipe(map(prop('nodeType')), flip(without)(openFor), propNotEq('length', openFor.length)),
  target: $sidePanelOpen
})
