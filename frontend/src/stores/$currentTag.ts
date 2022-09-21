import { createStore, sample } from 'effector'
import { propEq } from 'ramda'
import { Tag } from '~shared/types/domain/tag'
import { $tagStore } from '~stores/$tagStore'
import { $selectedValue } from '~stores/$valuesStore'

export const $currentTag = createStore<Tag | null>(null)

sample({
  source: [$selectedValue, $tagStore] as [typeof $selectedValue, typeof $tagStore],
  fn: ([value, tags]) => tags.tags.find(propEq('name', value?.tag)) ?? null,
  target: $currentTag
})
