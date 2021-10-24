import * as t from 'io-ts'

import { idCodec } from '../utils/idCodec'
import { nonEmptyString } from '../shared/codecs/nonEmptyString'
import { emailCodec } from '../shared/codecs/emailCodec'
import { passwordString } from '../shared/codecs/passwordString'

export const TUser = t.type({
  name: nonEmptyString,
  email: emailCodec,
  lastDocument: idCodec,
  password: passwordString,
  token: t.string
})

export type User = t.TypeOf<typeof TUser>
