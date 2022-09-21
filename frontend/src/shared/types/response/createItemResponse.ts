import { array, object } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { arrayNodeId, idCodec } from '~shared/codecs/idCodec'
import { ZValue } from '~shared/types/domain/values/value'

export const ZCreateItemResponse = object({
  values: array(ZValue),
  arrayItemId: idCodec,
  arrayNodeId
})

export type CreateItemResponse = TypeOf<typeof ZCreateItemResponse>
