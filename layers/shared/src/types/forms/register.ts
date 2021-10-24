import * as t from 'io-ts'
import { nonEmptyString } from '../../codecs/nonEmptyString'
import { emailCodec } from '../../codecs/emailCodec'
import { passwordString } from '../../codecs/passwordString'

export const TRegister = t.type({
  name: nonEmptyString,
  email: emailCodec,
  password: passwordString,
  passwordRepeat: passwordString
})

export type Register = t.TypeOf<typeof TRegister>
