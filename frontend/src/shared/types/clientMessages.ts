import * as t from 'io-ts'

import { idCodec } from '../codecs/idCodec'
import { TNewNode } from './forms/newNode'
import { TNodeSettings } from './forms/nodetypes'

const DocumentRequest = t.type({
  type: t.literal('DOCUMENT')
})

export const NewNodeRequest = t.intersection([
  t.type({
    type: t.literal('NEW_NODE')
  }),
  TNewNode
])

export const EditNodeSettings = t.intersection([
  t.type({
    type: t.literal('NODE_SETTINGS')
  }),
  TNodeSettings
])

export const DeleteNodeRequest = t.type({
  type: t.literal('DELETE_NODE'),
  id: idCodec
})

export const TClientMessage = t.union([
  DocumentRequest,
  NewNodeRequest,
  DeleteNodeRequest,
  EditNodeSettings
])
export type ClientMessage = t.TypeOf<typeof TClientMessage>
