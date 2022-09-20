import { createStore, sample } from 'effector'
import { join, juxt, pipe, prop, propOr, reject, uniqBy, whereEq } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node, NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { $treeStore } from '~stores/$treeStore'

import { arrayItemCreateFx } from '../events/array'
import { resetProject } from '../events/reset'
import { selectValue, valueDeleteFx, valueListFx, valueUpdateFx } from '../events/values'

export type SelectedValue = {
  nodeId: NodeId
  value?: Value
  tag: string
}

export const $valuesStore = createStore<Value[]>([])

const byIdAndTag = pipe(juxt([prop('nodeId'), propOr('', 'tag')]), join('-'))

$valuesStore.on(valueListFx.doneData, (state, result) =>
  uniqBy(byIdAndTag, result.values.concat(state))
)

// after creating a new array item let's todo
$valuesStore.on(arrayItemCreateFx.doneData, (state, result) => state)

$valuesStore.on(valueUpdateFx.doneData, (state, result) =>
  uniqBy(byIdAndTag, [result].concat(state))
)

$valuesStore.on(valueDeleteFx.done, (state, { params }) =>
  reject(whereEq({ nodeId: params.nodeId, tag: params.tag }), state)
)

export const $selectedValue = createStore<SelectedValue | null>(null)
  .on(selectValue, (_, result) => result)
  .reset(resetProject)

export const $selectedValueNode = createStore<TreeNode<Node> | null>(null)

sample({
  source: [$selectedValue, $treeStore] as [typeof $selectedValue, typeof $treeStore],
  fn: ([value, tree]) => tree.first(n => n.id === value?.nodeId) ?? null,
  target: $selectedValueNode
})
