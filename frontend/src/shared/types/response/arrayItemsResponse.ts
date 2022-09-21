import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

export const ZArrayItemsResponse = object({})

export type ArrayItemsResponse = TypeOf<typeof ZArrayItemsResponse>
