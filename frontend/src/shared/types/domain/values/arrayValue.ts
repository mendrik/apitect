import { literal, number, object } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { NodeType } from '~shared/types/domain/nodeType'

import { ZValueBase } from './valueBase'

export const ZArrayValue = ZValueBase.merge(
  object({
    nodeType: literal(NodeType.Array),
    value: number().default(0)
  })
)

export type ArrayValue = TypeOf<typeof ZArrayValue>
