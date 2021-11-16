import { boolean, intersection, number, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZNumberSettings = intersection(
  ZNodeSettingsBase,
  object({
    float: boolean(),
    validation: object({
      min: number(),
      max: number()
    }).partial(),
    display: object({
      prefix: string(),
      suffix: string()
    }).partial()
  })
)

export type NumberSettings = TypeOf<typeof ZNumberSettings>
