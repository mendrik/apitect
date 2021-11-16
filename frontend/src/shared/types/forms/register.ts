import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { emailCodec } from '../../codecs/emailCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'
import { passwordString } from '../../codecs/passwordString'

export const ZRegister = object({
  name: nonEmptyString,
  email: emailCodec,
  password: passwordString,
  passwordRepeat: passwordString
})

export type Register = TypeOf<typeof ZRegister>
