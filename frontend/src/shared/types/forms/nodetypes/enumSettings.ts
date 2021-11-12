import * as t from 'io-ts'

import { TNodeSettingsBase } from './nodeSettingsBase'

export const TEnumSettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    validation: t.partial({})
  })
])

export type EnumSettings = t.TypeOf<typeof TEnumSettings>
