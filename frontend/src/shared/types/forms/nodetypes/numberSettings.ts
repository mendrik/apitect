import * as t from 'io-ts'

import { withDefault } from '../../../codecs/withDefault'
import { TNodeSettingsBase } from './nodeSettingsBase'

export const TNumberSettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    float: withDefault(t.boolean, false),
    validation: t.partial({
      min: t.number,
      max: t.number
    }),
    display: t.partial({
      prefix: t.string,
      suffix: t.string
    })
  })
])

export type NumberSettings = t.TypeOf<typeof TNumberSettings>
