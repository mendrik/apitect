import { array, lazy, nativeEnum, object, Schema } from 'zod'

import { idCodec } from '../../codecs/idCodec'
import { nameCodec } from '../../codecs/nameCodec'
import { Id } from './id'
import { NodeType } from './nodeType'

export type NodeId = string

export interface Node {
  id: NodeId
  name: string
  nodeType: NodeType
  children: Node[]
}

export const ZNode: Schema<Node> = lazy(() =>
  object({
    id: idCodec,
    name: nameCodec,
    nodeType: nativeEnum(NodeType),
    children: array(ZNode)
  })
)
