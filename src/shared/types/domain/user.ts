import * as t from 'io-ts'

import { emailCodec } from '../../codecs/emailCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'
import { passwordString } from '../../codecs/passwordString'

export const TUiUser = t.exact(
  t.type({
    name: nonEmptyString,
    email: emailCodec
  })
)

export const TUser = t.intersection([
  TUiUser,
  t.type({
    password: passwordString
  })
])

export type User = t.TypeOf<typeof TUser>
export type UiUser = t.TypeOf<typeof TUiUser>
