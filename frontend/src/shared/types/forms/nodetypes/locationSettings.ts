import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZLocationSettings = ZNodeSettingsBase.augment({
  validation: object({})
})

export type LocationSettings = TypeOf<typeof ZLocationSettings>
