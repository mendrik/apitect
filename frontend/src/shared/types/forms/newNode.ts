import { nativeEnum, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'
import { nameCodec } from '../../codecs/nameCodec'
import { NodeType } from '../domain/nodeType'

export const TNewNode = object({
  name: nameCodec,
  nodeType: nativeEnum(NodeType),
  parentNode: idCodec.optional()
})

export type NewNode = TypeOf<typeof TNewNode>
