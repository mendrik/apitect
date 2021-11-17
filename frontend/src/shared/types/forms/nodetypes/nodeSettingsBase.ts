import { literal, object } from 'zod'

import { idCodec } from '../../../codecs/idCodec'
import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'

export const ZNodeSettingsBase = object({
  nodeId: idCodec,
  name: nonEmptyString
})
