import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZEnumSettings = ZNodeSettingsBase.augment({
  validation: object({})
})

export type EnumSettings = TypeOf<typeof ZEnumSettings>
