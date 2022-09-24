import { object, number, array } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { ZItem } from '~shared/types/domain/item'

export const ZArrayItemsResponse = object({
  total: number(),
  page: number(),
  pageSize: number(),
  items: array(ZItem)
})

export type ArrayItemsResponse = TypeOf<typeof ZArrayItemsResponse>
