import { boolean, literal, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { ZEnums } from '~shared/types/domain/enums'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZEnumSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Enum),
    required: boolean().default(false),
    enumeration: string(),
    enums: ZEnums
  })
)

export type EnumSettings = TypeOf<typeof ZEnumSettings>
