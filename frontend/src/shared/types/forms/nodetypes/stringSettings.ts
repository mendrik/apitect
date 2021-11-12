import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { regexpCodecAlt } from '../../../codecs/regexpCodecAlt'
import { NodeType } from '../../domain/nodeType'

export const TStringSettings = t.type({
  nodeType: t.literal(NodeType.String),
  name: nonEmptyString,
  validation: t.partial({
    regexp: regexpCodecAlt
  })
})

export type StringSettings = t.TypeOf<typeof TStringSettings>
