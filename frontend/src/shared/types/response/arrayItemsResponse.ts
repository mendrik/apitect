import { object, record, string, any, number } from 'zod'
import { TypeOf } from 'zod/lib/types'

export const ZArrayItemsResponse = object({
  total: number(),
  page: number(),
  pageSize: number(),
  items: record(string().min(1), any())
})

export type ArrayItemsResponse = TypeOf<typeof ZArrayItemsResponse>
