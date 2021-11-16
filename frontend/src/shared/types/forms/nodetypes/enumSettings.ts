import { intersection, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZEnumSettings = intersection(
  ZNodeSettingsBase,
  object({
    validation: object({}).optional()
  })
)

export type EnumSettings = TypeOf<typeof ZEnumSettings>
