import { boolean, literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZBinarySettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Binary),
    required: boolean().default(false),
    validation: object({})
  })
)

export type BinarySettings = TypeOf<typeof ZBinarySettings>
