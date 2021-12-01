import { boolean, literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZBooleanSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Boolean),
    validation: object({}),
    required: boolean().default(false)
  })
)

export type BooleanSettings = TypeOf<typeof ZBooleanSettings>
