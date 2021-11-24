import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'

export const ZProjectUsersSettings = object({
  nodeId: idCodec,
  emailId: idCodec,
  passwordId: idCodec
})

export type ProjectUsersSettings = TypeOf<typeof ZProjectUsersSettings>
