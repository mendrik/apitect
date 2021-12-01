import { boolean, literal, number, object, string, union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

const ZInteger = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Number),
    integer: boolean(),
    required: boolean().default(false),
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

const ZFloat = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Number),
    integer: boolean(),
    required: boolean().default(false),
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

export const ZNumberSettings = union([ZInteger, ZFloat])

export type NumberSettings = TypeOf<typeof ZNumberSettings>
