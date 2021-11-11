import * as t from 'io-ts'

import { enumCodec } from '../../codecs/enumCodec'
import { idCodec } from '../../codecs/idCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'
import { NodeType } from '../domain/nodeType'

export const TNewNode = t.type({
  name: nonEmptyString,
  nodeType: enumCodec('nodeType', NodeType),
  parentNode: t.union([t.undefined, idCodec])
})

export type NewNode = t.TypeOf<typeof TNewNode>
