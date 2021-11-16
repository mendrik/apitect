import { intersection, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZColorSettings = intersection(
  ZNodeSettingsBase,
  object({
    validation: object({}).optional()
  })
)

export type ColorSettings = TypeOf<typeof ZColorSettings>
