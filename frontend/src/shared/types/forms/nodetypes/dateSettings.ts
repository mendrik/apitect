import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TDateSettings = t.type({
  nodeType: t.literal(NodeType.Date),
  name: nonEmptyString,
  validation: t.partial({})
})

export type DateSettings = t.TypeOf<typeof TDateSettings>
