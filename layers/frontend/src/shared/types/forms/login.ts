import * as t from 'io-ts'

import { emailCodec } from '../../codecs/emailCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'

export const TLogin = t.type({
  email: emailCodec,
  password: nonEmptyString
})

export type Login = t.TypeOf<typeof TLogin>
