import { object } from 'zod'
import { idCodec } from '~shared/codecs/idCodec'
import { nameCodec } from '~shared/codecs/nameCodec'

export const ZNodeSettingsBase = object({
  nodeId: idCodec,
  name: nameCodec
})
