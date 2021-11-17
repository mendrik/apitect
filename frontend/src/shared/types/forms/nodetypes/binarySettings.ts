import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZBinarySettings = ZNodeSettingsBase.augment({
  validation: object({})
})

export type BinarySettings = TypeOf<typeof ZBinarySettings>
