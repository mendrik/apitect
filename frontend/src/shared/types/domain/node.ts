import * as t from 'io-ts'

import { enumCodec } from '../../codecs/enumCodec'
import { idCodec } from '../../codecs/idCodec'
import { withDefault } from '../../codecs/withDefault'
import { Id } from './id'
import { NodeType } from './nodeType'

export type Node = {
  id: Id
  name: string
  nodeType: NodeType
  children: Node[]
}

export const TNode: t.Type<Node> = t.recursion('node', () =>
  t.exact(
    t.type({
      id: idCodec as t.Any,
      name: t.string,
      nodeType: withDefault(enumCodec('nodeType', NodeType), NodeType.Object),
      children: withDefault(t.array(TNode), [])
    })
  )
)
