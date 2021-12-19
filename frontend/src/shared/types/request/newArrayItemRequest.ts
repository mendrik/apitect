import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { arrayNodeId } from '~shared/codecs/idCodec'

export const ZNewArrayItemRequest = object({
  tag: string(),
  arrayNodeId: arrayNodeId.optional()
})

export type NewArrayItemRequest = TypeOf<typeof ZNewArrayItemRequest>
