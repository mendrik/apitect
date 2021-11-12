import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'
import { TNodeSettingsBase } from './nodeSettingsBase'

export const TLocationSettings = t.intersection([
  TNodeSettingsBase,
  t.type({
    validation: t.partial({})
  })
])

export type LocationSettings = t.TypeOf<typeof TLocationSettings>
