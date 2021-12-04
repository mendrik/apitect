import { createStore } from 'effector'
import { Value } from '~shared/types/domain/values/value'

import { valueListFx } from '../events/values'

export const $valuesStore = createStore<Record<string, Value[]>>({})

$valuesStore.on(valueListFx.done, (state, { params, result }) => ({
  ...state,
  [params.tag]: result.values
}))
