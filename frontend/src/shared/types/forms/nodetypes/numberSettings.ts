import { boolean, literal, number, object, string, union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZNumberSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Number),
    required: boolean().default(false),
    validation: object({
      min: number().optional(),
      max: number().optional()
    }),
    display: object({
      step: number().default(1),
      unit: string().optional(),
      precision: number().optional()
    })
  })
)

export type NumberSettings = TypeOf<typeof ZNumberSettings>
