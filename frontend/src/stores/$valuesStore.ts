import { createStore } from 'effector'
import { uniqBy } from 'ramda'
import { Value } from '~shared/types/domain/values/value'
import { field } from '~shared/utils/ramda'

import { updateValueFx, valueListFx } from '../events/values'

export const $valuesStore = createStore<Value[]>([])

$valuesStore.on(valueListFx.done, (state, { result }) =>
  uniqBy(field('nodeId'), result.values.concat(state))
)

$valuesStore.on(updateValueFx.done, (state, { result }) =>
  uniqBy(field('nodeId'), [result].concat(state))
)
