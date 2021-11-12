import * as t from 'io-ts'

import { TNodeSettingsBase } from './nodeSettingsBase'

export const TNumberSettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    validation: t.partial({})
  })
])

export type NumberSettings = t.TypeOf<typeof TNumberSettings>
