import * as t from 'io-ts'
import { NonEmptyString } from 'io-ts-types'

import { emailCodec } from '../../utils/codecs/emailCodec'

export const TRegister = t.type({
  name: NonEmptyString,
  email: emailCodec,
  password: NonEmptyString,
  passwordRepeat: NonEmptyString
})

export type Register = t.TypeOf<typeof TRegister>
