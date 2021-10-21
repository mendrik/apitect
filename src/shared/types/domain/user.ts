import * as t from 'io-ts'

import { TRef } from '../../../backend/utils/reference'
import { emailCodec } from '../../codecs/emailCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'
import { passwordString } from '../../codecs/passwordString'

export const TUserBase = t.type({
  name: nonEmptyString,
  email: emailCodec,
  lastDocument: TRef
})

export const TUiUser = t.exact(
  t.intersection([
    TUserBase,
    t.type({
      id: t.string
    })
  ])
)

export const TUser = t.intersection([
  TUserBase,
  t.type({
    password: passwordString
  })
])

export type User = t.TypeOf<typeof TUser>
export type UiUser = t.TypeOf<typeof TUiUser>
