import { boolean, literal, number, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZNumberSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Number),
    integer: boolean().default(true),
    validation: object({
      min: number().optional(),
      max: number().optional()
    }),
    display: object({
      prefix: string().optional(),
      suffix: string().optional()
    })
  })
)

export type NumberSettings = TypeOf<typeof ZNumberSettings>
