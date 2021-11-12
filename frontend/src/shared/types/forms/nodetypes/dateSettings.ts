import * as t from 'io-ts'

import { TNodeSettingsBase } from './nodeSettingsBase'

export const TDateSettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    validation: t.partial({})
  })
])

export type DateSettings = t.TypeOf<typeof TDateSettings>
