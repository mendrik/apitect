import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'

export const ZUser = object({
  name: nonEmptyString,
  email: string().email(),
  lastDocument: idCodec,
  password: nonEmptyString.optional(),
  token: nonEmptyString.optional()
})

export type User = TypeOf<typeof ZUser>
