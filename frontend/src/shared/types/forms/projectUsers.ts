import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'

export const ZProjectUsers = object({
  nodeId: idCodec,
  emailId: idCodec,
  passwordId: idCodec
})

export type ProjectUsers = TypeOf<typeof ZProjectUsers>
