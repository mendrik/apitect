import { literal, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { NodeType } from '~shared/types/domain/nodeType'
import { ZValueBase } from '~shared/types/domain/values/valueBase'

export const ZEnumValue = ZValueBase.merge(
  object({
    nodeType: literal(NodeType.Enum),
    value: string()
  })
)

export type EnumValue = TypeOf<typeof ZEnumValue>
