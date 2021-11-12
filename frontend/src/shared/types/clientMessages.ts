import * as t from 'io-ts'

import { enumCodec } from '../codecs/enumCodec'
import { idCodec } from '../codecs/idCodec'
import { TNewNode } from './forms/newNode'
import { TNodeSettings } from './forms/nodetypes/nodeSettings'
import { ModalNames } from './modals'

const DocumentRequest = t.type({
  type: t.literal('DOCUMENT')
})

export const NewNodeRequest = t.intersection([
  t.type({
    type: t.literal('NEW_NODE')
  }),
  TNewNode
])

export const UpdateNodeSettings = t.intersection([
  t.type({
    type: t.literal('NODE_SETTINGS')
  }),
  TNodeSettings
])

const TModalPayloadRequest = t.type({
  modal: enumCodec('modal', ModalNames),
  nodeId: idCodec
})

export const RequestModalPayload = t.intersection([
  t.type({
    type: t.literal('REQUEST_MODAL_PAYLOAD')
  }),
  TModalPayloadRequest
])

export const DeleteNodeRequest = t.type({
  type: t.literal('DELETE_NODE'),
  id: idCodec
})

export const TClientMessage = t.union([
  DocumentRequest,
  NewNodeRequest,
  DeleteNodeRequest,
  UpdateNodeSettings,
  RequestModalPayload
])
export type ClientMessage = t.TypeOf<typeof TClientMessage>
