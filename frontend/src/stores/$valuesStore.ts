import { createStore } from 'effector'
import { uniqBy } from 'ramda'
import { TagName } from '~shared/types/domain/tag'
import { Value } from '~shared/types/domain/values/value'
import { field } from '~shared/utils/ramda'

import { valueListFx } from '../events/values'

export const $valuesStore = createStore<Record<TagName, Value[]>>({})

$valuesStore.on(valueListFx.done, (state, { params, result }) => ({
  ...state,
  [params.tag]: uniqBy(field('nodeId'), result.values.concat(state[params.tag] ?? []))
}))
