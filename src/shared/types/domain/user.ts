import * as t from 'io-ts'

import { emailCodec } from '../../codecs/emailCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'

export const TUiUser = t.exact(
  t.type({
    name: nonEmptyString,
    email: emailCodec,
    id: t.string,
    lastDocument: t.string
  })
)

export type UiUser = t.TypeOf<typeof TUiUser>
