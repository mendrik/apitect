import * as t from 'io-ts'

import { TNodeSettingsBase } from './nodeSettingsBase'

export const TBinarySettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    validation: t.partial({})
  })
])

export type BinarySettings = t.TypeOf<typeof TBinarySettings>
