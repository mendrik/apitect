import * as t from 'io-ts'

import { regexpCodecAlt } from '../../../codecs/regexpCodecAlt'
import { undefinedCodec } from '../../../codecs/undefined'
import { TNodeSettingsBase } from './nodeSettingsBase'

export const TStringSettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    validation: t.type({
      regexp: undefinedCodec(regexpCodecAlt)
    })
  })
])

export type StringSettings = t.TypeOf<typeof TStringSettings>
