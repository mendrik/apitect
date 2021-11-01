import * as t from 'io-ts'

const DocumentRequest = t.type({
  type: t.literal('DOCUMENT')
})

const NodeRequest = t.type({
  type: t.literal('NODE')
})

export const TClientMessage = t.union([DocumentRequest, NodeRequest])
export type ClientMessage = t.TypeOf<typeof TClientMessage>
