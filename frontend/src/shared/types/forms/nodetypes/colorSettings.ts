import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TColorSettings = t.type({
  nodeType: t.literal(NodeType.Color),
  name: nonEmptyString
})

export type ColorSettings = t.TypeOf<typeof TColorSettings>
