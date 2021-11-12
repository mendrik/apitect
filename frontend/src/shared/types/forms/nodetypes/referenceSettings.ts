import * as t from 'io-ts'

import { TNodeSettingsBase } from './nodeSettingsBase'

export const TReferenceSettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    validation: t.partial({})
  })
])

export type ReferenceSettings = t.TypeOf<typeof TReferenceSettings>
