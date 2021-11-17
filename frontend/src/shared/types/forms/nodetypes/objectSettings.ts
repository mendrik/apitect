import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZObjectSettings = ZNodeSettingsBase.augment({
  validation: object({})
})

export type ObjectSettings = TypeOf<typeof ZObjectSettings>
