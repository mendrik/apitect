import { emailCodec } from '@codecs/emailCodec'
import { nonEmptyString } from '@codecs/nonEmptyString'
import { passwordString } from '@codecs/passwordString'
import * as t from 'io-ts'

export const TRegister = t.type({
  name: nonEmptyString,
  email: emailCodec,
  password: passwordString,
  passwordRepeat: passwordString
})

export type Register = t.TypeOf<typeof TRegister>
