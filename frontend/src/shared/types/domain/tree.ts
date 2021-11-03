import * as t from 'io-ts'

import { hexString } from '../../codecs/hexString'
import { withDefault } from '../../codecs/withDefault'

export type UiNode = {
  id: string
  name: string
  children: UiNode[]
}

export const TUiNode: t.Type<UiNode> = t.recursion('node', () =>
  t.exact(
    t.type({
      id: hexString,
      name: t.string,
      children: withDefault(t.array(TUiNode), [])
    })
  )
)
