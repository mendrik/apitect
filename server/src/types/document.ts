import * as t from 'io-ts'

import { idCodec } from '../utils/idCodec'
import { TNode } from './tree'

export const TDocument = t.type({
  name: t.string,
  owner: idCodec,
  tree: TNode
})

export type Document = t.TypeOf<typeof TDocument>
