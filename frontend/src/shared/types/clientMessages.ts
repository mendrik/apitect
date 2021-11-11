import * as t from 'io-ts'

import { idCodec } from '../codecs/idCodec'
import { TNewNode } from './forms/newNode'

const DocumentRequest = t.type({
  type: t.literal('DOCUMENT')
})

export const NewNodeRequest = t.intersection([
  t.type({
    type: t.literal('NEW_NODE')
  }),
  TNewNode
])

export const DeleteNodeRequest = t.type({
  type: t.literal('DEL_NODE'),
  id: idCodec
})

export const TClientMessage = t.union([DocumentRequest, NewNodeRequest, DeleteNodeRequest])
export type ClientMessage = t.TypeOf<typeof TClientMessage>
