import { number, object } from 'zod'

import { idCodec } from '../../codecs/idCodec'
import { ZNode } from '../domain/node'

export const TNodeDeleted = object({
  tree: ZNode,
  position: number(),
  parentNode: idCodec
})
