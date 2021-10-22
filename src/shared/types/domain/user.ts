import * as t from 'io-ts'

import { emailCodec } from '../../codecs/emailCodec'
import { hexString } from '../../codecs/hexString'
import { nonEmptyString } from '../../codecs/nonEmptyString'

export const TUiUser = t.exact(
  t.type({
    name: nonEmptyString,
    email: emailCodec,
    id: hexString,
    lastDocument: hexString
  })
)

export type UiUser = t.TypeOf<typeof TUiUser>
