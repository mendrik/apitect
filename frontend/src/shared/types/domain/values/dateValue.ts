import { date, literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { NodeType } from '~shared/types/domain/nodeType'

import { ZValueBase } from './valueBase'

export const ZDateValue = ZValueBase.merge(
  object({
    nodeType: literal(NodeType.Date),
    value: date()
  })
)

export type DateValue = TypeOf<typeof ZDateValue>
