import * as t from 'io-ts'
import { ObjectId } from 'mongodb'

import { idCodec } from '../utils/idCodec'

export type Node = {
  _id: ObjectId
  name: string
  children: Node[]
}

export const TNode: t.Type<Node> = t.recursion('node', () =>
  t.type({
    _id: idCodec,
    name: t.string,
    children: t.array(TNode)
  })
)
