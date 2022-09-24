import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { arrayNodeId } from '~shared/codecs/idCodec'

export const ZCreateItemRequest = object({
  tag: string(),
  arrayNodeId
})

export type CreateItemRequest = TypeOf<typeof ZCreateItemRequest>
