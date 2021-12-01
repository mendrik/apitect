import { boolean, literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZEnumSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Enum),
    required: boolean().default(false),
    validation: object({})
  })
)

export type EnumSettings = TypeOf<typeof ZEnumSettings>
