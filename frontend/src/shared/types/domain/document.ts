import * as t from 'io-ts'

import { idCodec } from '../../codecs/idCodec'
import { TNode } from './tree'

export const TDocument = t.type({
  id: idCodec,
  name: t.string,
  owner: t.string,
  tree: TNode
})

export type Document = t.TypeOf<typeof TDocument>
