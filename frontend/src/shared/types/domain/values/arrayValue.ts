import { literal, object, undefined } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { NodeType } from '~shared/types/domain/nodeType'

import { ZValueBase } from './valueBase'

export const ZArrayValue = ZValueBase.merge(
  object({
    nodeType: literal(NodeType.Array),
    value: undefined()
  })
)

export type ArrayValue = TypeOf<typeof ZArrayValue>
