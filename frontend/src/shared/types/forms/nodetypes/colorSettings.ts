import * as t from 'io-ts'

import { TNodeSettingsBase } from './nodeSettingsBase'

export const TColorSettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    validation: t.partial({})
  })
])

export type ColorSettings = t.TypeOf<typeof TColorSettings>
