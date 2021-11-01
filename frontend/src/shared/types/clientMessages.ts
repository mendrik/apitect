import * as t from 'io-ts'

import { enumCodec } from '../codecs/enumCodec'
import { hexString } from '../codecs/hexString'

const DocumentRequest = t.type({
  type: t.literal('DOCUMENT')
})

export enum Operation {
  Delete,
  Upsert
}

export const NodeRequest = t.intersection([
  t.type({
    type: t.literal('NODE'),
    operation: enumCodec('crud', Operation)
  }),
  t.partial({
    nodeId: hexString,
    position: t.number
  })
])

export const TClientMessage = t.union([DocumentRequest, NodeRequest])
export type ClientMessage = t.TypeOf<typeof TClientMessage>
