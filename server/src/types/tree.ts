import * as t from 'io-ts'
import { ObjectId } from 'mongodb'
import { enumCodec } from '~shared/codecs/enumCodec'
import { withDefault } from '~shared/codecs/withDefault'
import { NodeType } from '~shared/types/domain/nodeType'

import { idCodec } from '../utils/idCodec'

export type Node = {
  _id: ObjectId
  name: string
  nodeType: NodeType
  children: Node[]
}

export const TNode: t.Type<Node> = t.recursion('node', () =>
  t.type({
    _id: idCodec,
    name: t.string,
    nodeType: withDefault(enumCodec('nodeType', NodeType), NodeType.Object),
    children: t.array(TNode)
  })
)
