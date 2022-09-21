import { createStore } from 'effector'
import { Id } from '~shared/types/domain/id'
import { Json } from '~shared/types/generic'

type Item = Json & { id: Id }

export const $arrayItems = createStore<Item[]>([])
export const $selectedArrayItem = createStore<Item | null>(null)
