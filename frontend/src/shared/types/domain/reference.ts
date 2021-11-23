import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'

export const ZReference = object({
  nodeId: idCodec,
  arrayItemId: string()
})

export type Reference = TypeOf<typeof ZReference>
