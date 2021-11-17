import { nativeEnum, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'
import { NodeType } from '../domain/nodeType'

export const TNewNode = object({
  name: nonEmptyString,
  nodeType: nativeEnum(NodeType),
  parentNode: idCodec.optional()
})

export type NewNode = TypeOf<typeof TNewNode>
