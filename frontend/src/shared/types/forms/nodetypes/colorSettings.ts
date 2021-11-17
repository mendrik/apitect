import { literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZColorSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Color),
    validation: object({})
  })
)

export type ColorSettings = TypeOf<typeof ZColorSettings>
