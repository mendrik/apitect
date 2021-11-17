import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZDateSettings = ZNodeSettingsBase.augment({
  validation: object({})
})

export type DateSettings = TypeOf<typeof ZDateSettings>
