import * as t from 'io-ts'
import { propOr } from 'ramda'

import { decode } from '../codecs/decode'
import { convertUnderscoreIds } from '../utils/rename'
import { TUiDocument } from './domain/document'

const ResetAppState = t.type({
  type: t.literal('RESET')
})

export const DocumentResponse = t.type({
  type: t.literal('DOCUMENT'),
  payload: TUiDocument
})

const NodeCreatedResponse = t.type({
  type: t.literal('NODE_CREATED')
})

export const TServerMessage = t.union([DocumentResponse, NodeCreatedResponse, ResetAppState])

export type ServerMessage = t.TypeOf<typeof TServerMessage>

export const wrapServerMessage =
  (payloadCodec: t.Any) =>
  (payload: any): ServerMessage => {
    const types = TServerMessage.types
    const message = types.find(t => propOr(null, 'payload', t.props) === payloadCodec)!
    return decode<ServerMessage>(message as t.Any)({
      type: message.props.type.name.replace(/"/g, ''),
      payload: convertUnderscoreIds(payload)
    })
  }
