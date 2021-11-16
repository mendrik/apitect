import { object } from 'zod'

import { idCodec } from '../../codecs/idCodec'
import { ZNode } from '../domain/node'

export const TNodeCreated = object({
  nodeId: idCodec,
  tree: ZNode
})
