import { nativeEnum, object, union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'
import { NodeType } from './nodeType'
import { ZNumberValue } from './values/numberValue'
import { ZStringValue } from './values/stringValue'

export const ZValueBase = object({
  id: idCodec,
  tagId: idCodec,
  nodeId: idCodec,
  nodeType: nativeEnum(NodeType)
})

export const ZValue = union([ZStringValue, ZNumberValue])

export type Value = TypeOf<typeof ZValue>
