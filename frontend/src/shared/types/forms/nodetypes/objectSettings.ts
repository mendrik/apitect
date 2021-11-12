import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TObjectSettings = t.type({
  nodeType: t.literal(NodeType.Object),
  name: nonEmptyString,
  validation: t.partial({})
})

export type ObjectSettings = t.TypeOf<typeof TObjectSettings>
