import { array, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'
import { nameCodec } from '../../codecs/nameCodec'

export const ZEnum = object({
  docId: idCodec,
  name: nameCodec,
  values: array(nameCodec)
})

export type Enum = TypeOf<typeof ZEnum>
