import * as t from 'io-ts'

import { TNodeSettingsBase } from './nodeSettingsBase'

export const TArraySettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    validation: t.partial({})
  })
])

export type ArraySettings = t.TypeOf<typeof TArraySettings>
