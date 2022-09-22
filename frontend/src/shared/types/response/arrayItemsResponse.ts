import { object, record, string, any, number, union } from 'zod'
import { TypeOf } from 'zod/lib/types'

export const ZArrayItemsResponse = object({
  total: number(),
  page: number(),
  pageSize: number(),
  items: union([
    object({
      id: string(),
      displayString: string()
    }),
    record(string().min(1), any())
  ])
})

export type ArrayItemsResponse = TypeOf<typeof ZArrayItemsResponse>
