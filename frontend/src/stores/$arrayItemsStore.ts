import { createStore, sample } from 'effector'
import { apply } from 'ramda'
import { isNotNil } from 'ramda-adjunct'
import { ApiParam } from '~shared/apiTypes'
import { Id } from '~shared/types/domain/id'
import { Json } from '~shared/types/generic'
import { matches } from '~shared/utils/ramda'
import { $selectedArrayNode } from '~stores/$arrayStores'
import { $currentTag } from '~stores/$currentTag'

import { arrayItemsFx } from '../events/array'

type Item = Json & {
  id: Id
  displayString: string
}

export const $arrayItems = createStore<Item[]>([])
export const $selectedArrayItem = createStore<Item | null>(null)

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

$arrayItems.on(arrayItemsFx, (state, payload) => {})
