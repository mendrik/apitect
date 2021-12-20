import { boolean, object, string } from 'zod'
import { idCodec, nodeId } from '~shared/codecs/idCodec'
import { nameCodec } from '~shared/codecs/nameCodec'

export const ZValueBase = object({
  nodeId,
  tag: nameCodec,
  arrayItemId: idCodec.optional(),
  owner: string().optional(),
  author: string().optional(),
  published: boolean().optional()
})
