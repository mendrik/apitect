import { object, record, string, any } from 'zod'
import { TypeOf } from 'zod/lib/types'

export const ZArrayItemsResponse = object({
  items: record(string().min(1), any())
})

export type ArrayItemsResponse = TypeOf<typeof ZArrayItemsResponse>
