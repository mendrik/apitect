import { boolean, object, string } from 'zod'
import { idCodec } from '~shared/codecs/idCodec'
import { nameCodec } from '~shared/codecs/nameCodec'

export const ZValueBase = object({
  nodeId: idCodec,
  tag: nameCodec,
  owner: string().optional(),
  author: string().optional(),
  published: boolean().optional()
})
