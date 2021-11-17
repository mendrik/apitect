import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZBooleanSettings = ZNodeSettingsBase.augment({
  validation: object({})
})

export type BooleanSettings = TypeOf<typeof ZBooleanSettings>
