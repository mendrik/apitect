import { literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { dateCodec } from '~shared/codecs/dateCodec'
import { NodeType } from '~shared/types/domain/nodeType'

import { ZValueBase } from './valueBase'

export const ZDateValue = ZValueBase.merge(
  object({
    nodeType: literal(NodeType.Date),
    value: dateCodec
  })
)

export type DateValue = TypeOf<typeof ZDateValue>
