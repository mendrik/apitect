import * as t from 'io-ts'

import { emailCodec } from '../../codecs/emailCodec'
import { idCodec } from '../../codecs/idCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'

export const TUser = t.intersection([
  t.type({
    name: nonEmptyString,
    email: emailCodec,
    lastDocument: idCodec
  }),
  t.partial({
    password: nonEmptyString,
    token: t.union([t.string, t.undefined])
  })
])

export type User = t.TypeOf<typeof TUser>
