import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZColorSettings = ZNodeSettingsBase.augment({
  validation: object({})
})

export type ColorSettings = TypeOf<typeof ZColorSettings>
