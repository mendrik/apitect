import * as t from 'io-ts'

import { emailCodec } from '../../utils/codecs/emailCodec'
import { nonEmptyString } from '../../utils/codecs/nonEmptyString'
import { passwordString } from '../../utils/codecs/passwordString'

export const TRegister = t.type({
  name: nonEmptyString,
  email: emailCodec,
  password: passwordString,
  passwordRepeat: passwordString
})

export type Register = t.TypeOf<typeof TRegister>
