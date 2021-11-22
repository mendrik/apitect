import { array, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'

export const ZEnum = object({
  docId: idCodec,
  name: string(),
  values: array(string())
})

export type Enum = TypeOf<typeof ZEnum>
