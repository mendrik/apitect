import { intersection, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZReferenceSettings = intersection(
  ZNodeSettingsBase,
  object({
    validation: object({}).optional()
  })
)

export type ReferenceSettings = TypeOf<typeof ZReferenceSettings>
