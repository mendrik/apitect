import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TEnumSettings = t.type({
  nodeType: t.literal(NodeType.Enum),
  name: nonEmptyString
})

export type EnumSettings = t.TypeOf<typeof TEnumSettings>
