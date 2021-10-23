import { hexString } from '@codecs/hexString'
import * as t from 'io-ts'

export const TUiDocument = t.exact(
  t.type({
    name: t.string,
    owner: hexString
  })
)

export type UiDocument = t.TypeOf<typeof TUiDocument>
