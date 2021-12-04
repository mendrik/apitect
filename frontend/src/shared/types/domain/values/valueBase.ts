import { boolean, nativeEnum, object, string } from 'zod'

import { idCodec } from '../../../codecs/idCodec'
import { nameCodec } from '../../../codecs/nameCodec'
import { NodeType } from '../nodeType'

export const ZValueBase = object({
  nodeId: idCodec,
  nodeType: nativeEnum(NodeType),
  tag: nameCodec,
  owner: string().optional(),
  author: string().optional(),
  published: boolean()
})
