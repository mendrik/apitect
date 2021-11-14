import * as t from 'io-ts'

import { idCodec } from '../../codecs/idCodec'
import { TNode } from '../domain/node'

export const TNodeDeleted = t.type({
  tree: TNode,
  position: t.number,
  parentNode: idCodec
})
