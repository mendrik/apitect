import * as t from 'io-ts'
import { nullable } from 'io-ts/Type'

import { TDocument } from './document'

const DocumentRequest = t.type({
  type: t.literal('DOCUMENT')
})

const ResetAppState = t.type({
  type: t.literal('RESET')
})

const NodeRequest = t.type({
  type: t.literal('NODE')
})

export const TClientMessage = t.union([DocumentRequest, NodeRequest])

export type ClientMessage = t.TypeOf<typeof TClientMessage>

export const DocumentResponse = t.type({
  type: t.literal('DOCUMENT'),
  document: nullable(TDocument)
})

const NodeResponse = t.type({
  type: t.literal('NODE')
})

export const TServerMessage = t.union([DocumentResponse, NodeResponse, ResetAppState])

export type ServerMessage = t.TypeOf<typeof TServerMessage>
