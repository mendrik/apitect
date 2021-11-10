import * as t from 'io-ts'
import { propOr } from 'ramda'

import { decode } from '../codecs/decode'
import { convertUnderscoreIds } from '../utils/rename'
import { TUiDocument } from './domain/document'

export type Send = <T extends ServerMessage['type']>(
  type: T,
  payload: Extract<ServerMessage, { type: T }>['payload']
) => void

const ResetAppState = t.type({
  type: t.literal('RESET'),
  payload: t.undefined
})

export const DocumentResponse = t.type({
  type: t.literal('DOCUMENT'),
  payload: TUiDocument
})

const NodeCreatedResponse = t.type({
  type: t.literal('NODE_CREATED'),
  payload: t.string
})

const NodeDeleteResponse = t.type({
  type: t.literal('NODE_DELETED'),
  payload: t.type({
    position: t.number,
    parentNode: t.string
  })
})

export const TServerMessage = t.union([
  DocumentResponse,
  NodeCreatedResponse,
  NodeDeleteResponse,
  ResetAppState
])

export type ServerMessage = t.TypeOf<typeof TServerMessage>

export const sendAsServerMessage =
  (payloadCodec: t.Any, send: Send) =>
  (payload: any): void => {
    const types = TServerMessage.types
    const message = types.find(t => propOr(null, 'payload', t.props) === payloadCodec)!
    const validMessage = decode<ServerMessage>(message as t.Any)({
      type: message.props.type.name.replace(/"/g, ''),
      payload: convertUnderscoreIds(payload)
    })
    send(validMessage.type, validMessage.payload)
  }
