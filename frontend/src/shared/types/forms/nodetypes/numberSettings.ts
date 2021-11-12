import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TNumberSettings = t.type({
  nodeType: t.literal(NodeType.Number),
  name: nonEmptyString,
  validation: t.partial({})
})

export type NumberSettings = t.TypeOf<typeof TNumberSettings>
