import * as t from 'io-ts'

import { hexString } from '../../codecs/hexString'
import { TUiNode } from './tree'

export const TUiDocument = t.exact(
  t.type({
    name: t.string,
    owner: hexString,
    tree: TUiNode
  })
)

export type UiDocument = t.TypeOf<typeof TUiDocument>
