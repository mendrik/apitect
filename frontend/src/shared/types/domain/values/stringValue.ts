import { literal, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { NodeType } from '~shared/types/domain/nodeType'

import { ZValueBase } from './valueBase'

export const ZStringValue = ZValueBase.merge(
  object({
    nodeType: literal(NodeType.String),
    value: string()
  })
)

export type StringValue = TypeOf<typeof ZStringValue>
