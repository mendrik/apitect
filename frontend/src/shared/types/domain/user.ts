import * as t from 'io-ts'

import { emailCodec } from '../../codecs/emailCodec'
import { idCodec } from '../../codecs/idCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'
import { undefinedCodec } from '../../codecs/undefined'

export const TUser = t.intersection([
  t.type({
    name: nonEmptyString,
    email: emailCodec,
    lastDocument: idCodec
  }),
  t.partial({
    password: nonEmptyString,
    token: undefinedCodec(t.string)
  })
])

export type User = t.TypeOf<typeof TUser>
