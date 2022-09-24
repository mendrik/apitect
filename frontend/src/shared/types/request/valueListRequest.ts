import { array, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { nodeId } from '~shared/codecs/idCodec'

export const ZValueListRequest = object({
  tag: string(),
  nodeIds: array(nodeId)
})

export type ValueListRequest = TypeOf<typeof ZValueListRequest>
