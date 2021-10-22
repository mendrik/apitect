import * as t from 'io-ts'

import { hexString } from '../../codecs/hexString'

export const TUiDocument = t.exact(
  t.type({
    name: t.string,
    owner: hexString
  })
)

export type UiDocument = t.TypeOf<typeof TUiDocument>
