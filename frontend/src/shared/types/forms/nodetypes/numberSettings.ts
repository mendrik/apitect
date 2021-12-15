import { boolean, literal, number, object, string } from 'zod'
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
      step: number().min(0.001).optional(),
      unit: string().optional(),
      precision: number().min(0).default(0)
    })
  })
)

export type NumberSettings = TypeOf<typeof ZNumberSettings>
