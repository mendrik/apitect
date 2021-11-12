import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TBooleanSettings = t.type({
  nodeType: t.literal(NodeType.Boolean),
  name: nonEmptyString,
  validation: t.partial({})
})

export type BooleanSettings = t.TypeOf<typeof TBooleanSettings>
