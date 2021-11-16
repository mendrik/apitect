import { array, lazy, nativeEnum, object, Schema, string } from 'zod'

import { idCodec } from '../../codecs/idCodec'
import { Id } from './id'
import { NodeType } from './nodeType'

export interface Node {
  id: Id
  name: string
  nodeType: NodeType
  children: Node[]
}

export const ZNode: Schema<Node> = lazy(() =>
  object({
    id: idCodec,
    name: string(),
    nodeType: nativeEnum(NodeType),
    children: array(ZNode)
  })
)
