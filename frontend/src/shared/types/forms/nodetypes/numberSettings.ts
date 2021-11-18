import { boolean, literal, number, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZNumberSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Number),
    integer: boolean(),
    validation: object({
      min: number().optional(),
      max: number().optional(),
      step: number().default(1)
    }),
    display: object({
      unit: string().optional(),
      precision: number().optional()
    })
  })
)

export type NumberSettings = TypeOf<typeof ZNumberSettings>
