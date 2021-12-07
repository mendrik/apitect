import { createStore } from 'effector'
import { both, join, juxt, pipe, prop, propEq, propOr, reject, uniqBy } from 'ramda'
import { Value } from '~shared/types/domain/values/value'

import { deleteValueFx, updateValueFx, valueListFx } from '../events/values'

export const $valuesStore = createStore<Value[]>([])

const byIdAndTag = pipe(juxt([prop('nodeId'), propOr('', 'tag')]), join('-'))

$valuesStore.on(valueListFx.done, (state, { result }) =>
  uniqBy(byIdAndTag, result.values.concat(state))
)

$valuesStore.on(updateValueFx.done, (state, { result }) =>
  uniqBy(byIdAndTag, [result].concat(state))
)

$valuesStore.on(deleteValueFx.done, (state, { params }) =>
  reject(both(propEq('nodeId', params.nodeId), propEq('tag', params.tag)), state)
)
