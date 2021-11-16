import { intersection, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { regexpCodecAlt } from '../../../codecs/regexpCodecAlt'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZStringSettings = intersection(
  ZNodeSettingsBase,
  object({
    validation: object({
      regexp: regexpCodecAlt
    })
  })
)

export type StringSettings = TypeOf<typeof ZStringSettings>
