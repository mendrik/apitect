import * as t from 'io-ts'

import { TNodeSettingsBase } from './nodeSettingsBase'

export const TBooleanSettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    validation: t.partial({})
  })
])

export type BooleanSettings = t.TypeOf<typeof TBooleanSettings>
