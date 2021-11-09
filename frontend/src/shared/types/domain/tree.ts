import * as t from 'io-ts'

import { enumCodec } from '../../codecs/enumCodec'
import { hexString } from '../../codecs/hexString'
import { withDefault } from '../../codecs/withDefault'
import { NodeType } from './nodeType'

export type UiNode = {
  id: string
  name: string
  type: NodeType
  children: UiNode[]
}

export const TUiNode: t.Type<UiNode> = t.recursion('node', () =>
  t.exact(
    t.type({
      id: hexString,
      name: t.string,
      type: withDefault(enumCodec('nodeType', NodeType), NodeType.Object),
      children: withDefault(t.array(TUiNode), [])
    })
  )
)
