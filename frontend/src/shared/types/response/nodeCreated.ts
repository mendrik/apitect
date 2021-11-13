import * as t from 'io-ts'

import { idCodec } from '../../codecs/idCodec'
import { TNode } from '../domain/tree'

export const TNodeCreated = t.type({
  nodeId: idCodec,
  tree: TNode
})
