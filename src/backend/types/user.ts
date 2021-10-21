import * as t from 'io-ts'

import { emailCodec } from '../../shared/codecs/emailCodec'
import { nonEmptyString } from '../../shared/codecs/nonEmptyString'
import { passwordString } from '../../shared/codecs/passwordString'
import { TRef } from '../utils/reference'

export const TUser = t.type({
  name: nonEmptyString,
  email: emailCodec,
  lastDocument: TRef,
  password: passwordString
})

export type User = t.TypeOf<typeof TUser>
