import { literal, number, object } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { NodeType } from '~shared/types/domain/nodeType'

import { ZValueBase } from './valueBase'

export const ZNumberValue = ZValueBase.merge(
  object({
    nodeType: literal(NodeType.Number),
    value: number()
  })
)

export type NumberValue = TypeOf<typeof ZNumberValue>
