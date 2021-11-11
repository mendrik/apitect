import * as t from 'io-ts'

import { TNode } from './tree'

export const TDocument = t.type({
  name: t.string,
  owner: t.string,
  tree: TNode
})

export type Document = t.TypeOf<typeof TDocument>
