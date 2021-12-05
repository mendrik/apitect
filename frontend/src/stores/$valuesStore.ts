import { createStore } from 'effector'
import { join, juxt, pipe, prop, propOr, uniqBy } from 'ramda'
import { Value } from '~shared/types/domain/values/value'

import { updateValueFx, valueListFx } from '../events/values'

export const $valuesStore = createStore<Value[]>([])

const byIdAndTag = pipe(juxt([prop('nodeId'), propOr('', 'tag')]), join('-'))

$valuesStore.on(valueListFx.done, (state, { result }) =>
  uniqBy(byIdAndTag, result.values.concat(state))
)

$valuesStore.on(updateValueFx.done, (state, { result }) =>
  uniqBy(byIdAndTag, [result].concat(state))
)
