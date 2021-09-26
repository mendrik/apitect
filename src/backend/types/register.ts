import * as t from 'io-ts'

import { emailCodec } from '../../utils/codecs/emailCodec'
import { nonEmptyString } from '../../utils/codecs/nonEmptyString'

export const TRegister = t.type({
  name: nonEmptyString,
  email: emailCodec,
  password: nonEmptyString,
  passwordRepeat: nonEmptyString
})

export type Register = t.TypeOf<typeof TRegister>
