import { boolean, literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { NodeType } from '~shared/types/domain/nodeType'

import { ZValueBase } from './valueBase'

export const ZBooleanValue = ZValueBase.merge(
  object({
    nodeType: literal(NodeType.Boolean),
    value: boolean()
  })
)

export type BooleanValue = TypeOf<typeof ZBooleanValue>

export const getBooleanValidator = () => boolean()
