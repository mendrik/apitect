import { emailCodec } from '@codecs/emailCodec'
import { nonEmptyString } from '@codecs/nonEmptyString'
import { passwordString } from '@codecs/passwordString'
import * as t from 'io-ts'

import { idCodec } from '../utils/idCodec'

export const TUser = t.type({
  name: nonEmptyString,
  email: emailCodec,
  lastDocument: idCodec,
  password: passwordString,
  token: t.string
})

export type User = t.TypeOf<typeof TUser>
