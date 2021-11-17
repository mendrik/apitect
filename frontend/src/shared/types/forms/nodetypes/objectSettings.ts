import { boolean } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZObjectSettings = ZNodeSettingsBase.augment({
  apiEndpoint: boolean()
})

export type ObjectSettings = TypeOf<typeof ZObjectSettings>
