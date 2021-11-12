import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TArraySettings = t.type({
  nodeType: t.literal(NodeType.Array),
  name: nonEmptyString,
  validation: t.partial({})
})

export type ArraySettings = t.TypeOf<typeof TArraySettings>
