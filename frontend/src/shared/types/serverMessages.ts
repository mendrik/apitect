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

const NodeDeleteResponse = t.type({
  type: t.literal('NODE_DELETED'),
  payload: t.type({
    position: t.number,
    parentNode: idCodec
  })
})

export const TServerMessage = t.union([
  DocumentResponse,
  NodeCreatedResponse,
  NodeDeleteResponse,
  ResetAppState
])

export type ServerMessage = t.TypeOf<typeof TServerMessage>
