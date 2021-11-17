import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { regexpCodecAlt } from '../../../codecs/regexpCodecAlt'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZStringSettings = ZNodeSettingsBase.augment({
  validation: object({
    regexp: regexpCodecAlt.optional()
  })
})
export type StringSettings = TypeOf<typeof ZStringSettings>
