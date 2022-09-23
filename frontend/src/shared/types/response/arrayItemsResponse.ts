import { object, record, string, number, array } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { ZValue } from '~shared/types/domain/values/value'

export const ZArrayItemsResponse = object({
  total: number(),
  page: number(),
  pageSize: number(),
  items: record(string(), array(ZValue))
})

export type ArrayItemsResponse = TypeOf<typeof ZArrayItemsResponse>
