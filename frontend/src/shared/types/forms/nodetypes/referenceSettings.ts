import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZReferenceSettings = ZNodeSettingsBase.augment({
  validation: object({})
})

export type ReferenceSettings = TypeOf<typeof ZReferenceSettings>
