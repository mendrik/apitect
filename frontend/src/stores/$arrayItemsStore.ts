import { createStore, sample } from 'effector'
import { isNotNil } from 'ramda-adjunct'
import { Api } from '~shared/apiTypes'
import { Id } from '~shared/types/domain/id'
import { Json } from '~shared/types/generic'
import { matches } from '~shared/utils/ramda'
import { $api } from '~stores/$apiStore'
import { $selectedArrayNode } from '~stores/$arrayStores'
import { $currentTag } from '~stores/$currentTag'

import { arrayItemsFx } from '../events/array'

type Item = Json & { id: Id }

export const $arrayItems = createStore<Item[]>([])
export const $selectedArrayItem = createStore<Item | null>(null)

const api = (): Api => sample({ source: $api }).getState()

sample({
  source: [$currentTag, $selectedArrayNode] as [typeof $currentTag, typeof $selectedArrayNode],
  filter: matches(isNotNil, isNotNil),
  fn: ([tag, node]) => ({ tag: tag!.name, arrayNodeId: node!.value.id }),
  target: arrayItemsFx
})

$arrayItems.on(arrayItemsFx, (state, payload) => {})
