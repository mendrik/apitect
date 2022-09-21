import { object, string } from 'zod'
import { arrayNodeId } from '~shared/codecs/idCodec'

export const ZArrayItemsRequest = object({
  tag: string(),
  arrayNodeId
})
