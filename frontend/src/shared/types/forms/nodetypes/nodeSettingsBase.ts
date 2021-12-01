import { boolean, object } from 'zod'

import { idCodec } from '../../../codecs/idCodec'
import { nameCodec } from '../../../codecs/nameCodec'

export const ZNodeSettingsBase = object({
  nodeId: idCodec,
  name: nameCodec
})
