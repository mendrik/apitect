import { nativeEnum, object, union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../../codecs/idCodec'
import { NodeType } from '../nodeType'
import { ZReference } from '../reference'
import { ZNumberValue } from './numberValue'
import { ZStringValue } from './stringValue'

export const ZValueBase = object({
  id: idCodec,
  tagId: idCodec,
  nodeId: idCodec,
  nodeType: nativeEnum(NodeType),
  owner: ZReference
})

export const ZValue = union([ZStringValue, ZNumberValue])

export type Value = TypeOf<typeof ZValue>
