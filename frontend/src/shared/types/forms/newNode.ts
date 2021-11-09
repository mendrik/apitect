import * as t from 'io-ts'

import { enumCodec } from '../../codecs/enumCodec'
import { nonEmptyString } from '../../codecs/nonEmptyString'
import { nullable } from '../../codecs/nullable'
import { NodeType } from '../domain/nodeType'

export const TNewNode = t.type({
  name: nonEmptyString,
  nodeType: nullable(enumCodec('nodeType', NodeType)),
  parentNode: nullable(t.string)
})

export type NewNode = t.TypeOf<typeof TNewNode>
