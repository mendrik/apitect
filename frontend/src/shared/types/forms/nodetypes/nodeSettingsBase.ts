import * as t from 'io-ts'

import { idCodec } from '../../../codecs/idCodec'
import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TNodeSettingsBase = t.type({
  nodeType: t.literal(NodeType.String),
  nodeId: idCodec,
  name: nonEmptyString
})
