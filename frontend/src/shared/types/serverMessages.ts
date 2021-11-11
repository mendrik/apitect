import * as t from 'io-ts'

import { idCodec } from '../codecs/idCodec'
import { TDocument } from './domain/document'
import { TNode } from './domain/tree'

const ResetAppState = t.type({
  type: t.literal('RESET'),
  payload: t.undefined
})

export const DocumentResponse = t.type({
  type: t.literal('DOCUMENT'),
  payload: TDocument
})

const NodeCreatedResponse = t.type({
  type: t.literal('NODE_CREATED'),
  payload: TNode
})

const TNodeDelete = t.type({
  position: t.number,
  parentNode: idCodec
})

const NodeDeleteResponse = t.type({
  type: t.literal('NODE_DELETED'),
  payload: TNodeDelete
})

export const TServerMessage = t.union([
  DocumentResponse,
  NodeCreatedResponse,
  NodeDeleteResponse,
  ResetAppState
])

export type ServerMessage = t.TypeOf<typeof TServerMessage>
