import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TReferenceSettings = t.type({
  nodeType: t.literal(NodeType.Reference),
  name: nonEmptyString,
  validation: t.partial({})
})

export type ReferenceSettings = t.TypeOf<typeof TReferenceSettings>
