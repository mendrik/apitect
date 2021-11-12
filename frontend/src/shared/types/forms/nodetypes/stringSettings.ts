import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { regexpCodecAlt } from '../../../codecs/regexpCodecAlt'
import { undefinedCodec } from '../../../codecs/undefined'
import { NodeType } from '../../domain/nodeType'

export const TStringSettings = t.type({
  nodeType: t.literal(NodeType.String),
  name: nonEmptyString,
  validation: t.type({
    regexp: undefinedCodec(regexpCodecAlt)
  })
})

export type StringSettings = t.TypeOf<typeof TStringSettings>
