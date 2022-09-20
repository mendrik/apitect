import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

export const ZNewArrayItemRequest = object({
  tag: string()
})

export type NewArrayItemRequest = TypeOf<typeof ZNewArrayItemRequest>
