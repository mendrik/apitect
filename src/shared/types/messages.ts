import * as t from 'io-ts'

import { TDocument } from './document'

const DocumentRequest = t.type({
  type: t.literal('DOCUMENT')
})

const NodeRequest = t.type({
  type: t.literal('NODE')
})

export const TClientMessage = t.union([DocumentRequest, NodeRequest])

export type ClientMessage = t.TypeOf<typeof TClientMessage>

const DocumentResponse = t.type({
  type: t.literal('DOCUMENT'),
  document: TDocument
})

const NodeResponse = t.type({
  type: t.literal('NODE')
})

export const TServerMessage = t.union([DocumentResponse, NodeResponse])

export type ServerMessage = t.TypeOf<typeof TServerMessage>
