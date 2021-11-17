import { boolean, number, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZNumberSettings = ZNodeSettingsBase.augment({
  float: boolean(),
  validation: object({
    min: number().optional(),
    max: number().optional()
  }),
  display: object({
    prefix: string().optional(),
    suffix: string().optional()
  })
})

export type NumberSettings = TypeOf<typeof ZNumberSettings>
