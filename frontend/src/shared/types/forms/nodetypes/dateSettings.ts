import { intersection, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZDateSettings = intersection(
  ZNodeSettingsBase,
  object({
    validation: object({}).optional()
  })
)

export type DateSettings = TypeOf<typeof ZDateSettings>
