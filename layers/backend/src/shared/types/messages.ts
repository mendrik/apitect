import * as t from 'io-ts'
import { propOr } from 'ramda'

import { TUiDocument } from './domain/document'
import { decode } from '../codecs/decode'

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
  payload: TUiDocument
})

const NodeResponse = t.type({
  type: t.literal('NODE')
})

export const TServerMessage = t.union([DocumentResponse, NodeResponse, ResetAppState])

export type ServerMessage = t.TypeOf<typeof TServerMessage>

export const wrapServerMessage =
  (payloadCodec: t.Any) =>
  (payload: any): ServerMessage => {
    const types = TServerMessage.types
    const message = types.find(t => propOr(null, 'payload', t.props) === payloadCodec)!
    return decode<ServerMessage>(message as t.Any)({
      type: message.props.type.name.replace(/"/g, ''),
      payload
    })
  }
