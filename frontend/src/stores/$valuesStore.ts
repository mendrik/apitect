import { combine, createStore } from 'effector'
import { uniqBy } from 'ramda'
import { TagName } from '~shared/types/domain/tag'
import { Value } from '~shared/types/domain/values/value'
import { byProp, field } from '~shared/utils/ramda'

import { valueListFx } from '../events/values'
import { $tagStore } from './$tagStore'

export const $valuesStore = createStore<Value[]>([])

$valuesStore.on(valueListFx.done, (state, { params, result }) =>
  uniqBy(field('nodeId'), result.values.concat(state))
)

export const $tagValueMap = combine($tagStore, $valuesStore, ({ visibleTags }, values) => {
  return visibleTags.reduce(
    (p, { name }) => ({ ...p, [name]: byProp('nodeId', values) }),
    {}
  ) as Record<TagName, Record<string, Value>>
})
