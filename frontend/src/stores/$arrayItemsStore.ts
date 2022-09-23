import { createStore, sample } from 'effector'
import { apply } from 'ramda'
import { isNotNil } from 'ramda-adjunct'
import { ApiParam } from '~shared/apiTypes'
import { Id } from '~shared/types/domain/id'
import { Item } from '~shared/types/domain/item'
import { matches } from '~shared/utils/ramda'
import { $selectedArrayNode } from '~stores/$arrayStores'
import { $currentTag } from '~stores/$currentTag'

import { arrayItemsFx } from '../events/array'

export const $arrayItems = createStore<Item[]>([])
export const $selectedArrayItem = createStore<Id | null>(null)

sample({
  source: [$currentTag, $selectedArrayNode] as [typeof $currentTag, typeof $selectedArrayNode],
  filter: apply(matches(isNotNil, isNotNil)),
  fn: ([tag, node]): ApiParam<'arrayItems'> => ({
    tag: tag!.name,
    arrayNodeId: node!.value.id,
    page: 0,
    pageSize: 100
  }),
  target: arrayItemsFx
})

$arrayItems.on(arrayItemsFx.doneData, (state, { items, page, pageSize }) =>
  state.splice(0, pageSize, ...items)
)
