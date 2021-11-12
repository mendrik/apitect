import * as t from 'io-ts'

import { TNodeSettingsBase } from './nodeSettingsBase'

export const TObjectSettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    validation: t.partial({})
  })
])

export type ObjectSettings = t.TypeOf<typeof TObjectSettings>
