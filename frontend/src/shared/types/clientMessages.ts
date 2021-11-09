import * as t from 'io-ts'

import { TNewNode } from './forms/newNode'

const DocumentRequest = t.type({
  type: t.literal('DOCUMENT')
})

export enum Operation {
  Delete,
  Upsert
}

export const NewNodeRequest = t.intersection([
  t.type({
    type: t.literal('NEW_NODE')
  }),
  TNewNode
])

export const DeleteNodeRequest = t.type({
  type: t.literal('DEL_NODE'),
  id: t.string
})

export const TClientMessage = t.union([DocumentRequest, NewNodeRequest, DeleteNodeRequest])
export type ClientMessage = t.TypeOf<typeof TClientMessage>
