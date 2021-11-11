import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TStringSettings = t.type({
  nodeType: t.literal(NodeType.String),
  name: nonEmptyString
})

export type StringSettings = t.TypeOf<typeof TStringSettings>
