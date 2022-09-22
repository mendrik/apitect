import { createStore, sample } from 'effector'
import { apply } from 'ramda'
import { isNotNil } from 'ramda-adjunct'
import { Id } from '~shared/types/domain/id'
import { Json } from '~shared/types/generic'
import { matches } from '~shared/utils/ramda'
import { $selectedArrayNode } from '~stores/$arrayStores'
import { $currentTag } from '~stores/$currentTag'

import { arrayItemsFx } from '../events/array'

type Item = Json & { id: Id }

export const $arrayItems = createStore<Item[]>([])
export const $selectedArrayItem = createStore<Item | null>(null)

sample({
  source: [$currentTag, $selectedArrayNode] as [typeof $currentTag, typeof $selectedArrayNode],
  filter: apply(matches(isNotNil, isNotNil)),
  fn: ([tag, node]) => ({ tag: tag!.name, arrayNodeId: node!.value.id }),
  target: arrayItemsFx
})

$arrayItems.on(arrayItemsFx, (state, payload) => {})
