import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TBinarySettings = t.type({
  nodeType: t.literal(NodeType.Binary),
  name: nonEmptyString
})

export type BinarySettings = t.TypeOf<typeof TBinarySettings>
