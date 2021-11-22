import { object } from 'zod'

import { idCodec } from '../../../codecs/idCodec'
import { nonEmptyString } from '../../../codecs/nonEmptyString'

export const ZNodeSettingsBase = object({
  nodeId: idCodec,
  name: nonEmptyString
})
