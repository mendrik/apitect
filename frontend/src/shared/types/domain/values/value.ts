import { boolean, nativeEnum, object, string, union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../../codecs/idCodec'
import { NodeType } from '../nodeType'
import { ZNumberValue } from './numberValue'
import { ZStringValue } from './stringValue'

export const ZValueBase = object({
  nodeId: idCodec,
  nodeType: nativeEnum(NodeType),
  tag: string().optional(),
  owner: string().optional(),
  author: string().optional(),
  published: boolean()
})

export const ZValue = union([ZStringValue, ZNumberValue])

export type Value = TypeOf<typeof ZValue>
