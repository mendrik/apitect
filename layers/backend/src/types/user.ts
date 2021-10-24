import * as t from 'io-ts'
import { emailCodec } from '~shared/codecs/emailCodec'
import { nonEmptyString } from '~shared/codecs/nonEmptyString'
import { passwordString } from '~shared/codecs/passwordString'

import { idCodec } from '../utils/idCodec'

export const TUser = t.type({
  name: nonEmptyString,
  email: emailCodec,
  lastDocument: idCodec,
  password: passwordString,
  token: t.string
})

export type User = t.TypeOf<typeof TUser>
