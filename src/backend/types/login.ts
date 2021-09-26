import * as t from 'io-ts'
import v from 'validator'

import { emailCodec } from '../../utils/codecs/emailCodec'
import { nonEmptyString } from '../../utils/codecs/nonEmptyString'
import { validationCodec } from '../../utils/codecs/validationCodec'

export const TLogin = t.type({
  email: emailCodec,
  password: nonEmptyString
})

export type Login = t.TypeOf<typeof TLogin>
