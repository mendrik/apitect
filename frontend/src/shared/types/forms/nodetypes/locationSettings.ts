import * as t from 'io-ts'

import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const TLocationSettings = t.type({
  nodeType: t.literal(NodeType.Location),
  name: nonEmptyString,
  validation: t.partial({})
})

export type LocationSettings = t.TypeOf<typeof TLocationSettings>
