import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZArraySettings = ZNodeSettingsBase.augment({
  validation: object({})
})

export type ArraySettings = TypeOf<typeof ZArraySettings>
