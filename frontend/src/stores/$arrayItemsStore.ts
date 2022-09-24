import { createStore, sample } from 'effector'
import { prop } from 'ramda'
import { isNotNil } from 'ramda-adjunct'
import { ApiParam } from '~shared/apiTypes'
import { Id } from '~shared/types/domain/id'
import { Item } from '~shared/types/domain/item'
import { matchesArr } from '~shared/utils/ramda'
import { $selectedArrayNode } from '~stores/$arrayStores'
import { $currentTag } from '~stores/$currentTag'

import { arrayItemsFx } from '../events/array'

export const $arrayItems = createStore<Item[]>([])
export const $selectedArrayItem = createStore<Id | null>(null)
export const $itemsTotal = createStore<number | null>(null)

sample({
  source: [$currentTag, $selectedArrayNode] as [typeof $currentTag, typeof $selectedArrayNode],
  filter: matchesArr(isNotNil, isNotNil),
  fn: ([tag, node]): ApiParam<'arrayItems'> => ({
    tag: tag!.name,
    arrayNodeId: node!.value.id,
    page: 0,
    pageSize: 100
  }),
  target: arrayItemsFx
})

$arrayItems.on(arrayItemsFx.doneData, (state, { items, page, pageSize }) => {
  state.splice(page, pageSize, ...items)
  return [...state]
})

sample({
  clock: arrayItemsFx.doneData,
  fn: prop('total'),
  target: $itemsTotal
})
