import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { emailCodec } from '../../codecs/emailCodec'
import { idCodec } from '../../codecs/idCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'

export const ZUser = object({
  name: nonEmptyString,
  email: emailCodec,
  lastDocument: idCodec,
  password: nonEmptyString.optional(),
  token: nonEmptyString.optional()
})

export type User = TypeOf<typeof ZUser>
