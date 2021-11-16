import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { emailCodec } from '../../codecs/emailCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'

export const ZLogin = object({
  email: emailCodec,
  password: nonEmptyString
})

export type Login = TypeOf<typeof ZLogin>
