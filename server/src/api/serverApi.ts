import * as t from 'io-ts'
import { head, map, values } from 'ramda'
import { Api, ApiSchema } from '~shared/api'
import { idCodec } from '~shared/codecs/idCodec'

import { Respond } from '../services/websocket'
import { document } from './document'
import { nodeCreate } from './nodeCreate'
import { nodeDelete } from './nodeDelete'
import { nodeSettings } from './nodeSettings'
import { updateNodeSettings } from './updateNodeSettings'

export type ServerApiMethod<T extends keyof ApiSchema> = ({
  email,
  respond,
  payload
}: {
  email: string
  respond: Respond
  payload: Parameters<Api[T]>[0]
}) => ReturnType<Api[T]>

const codecs = map(head, values(ApiSchema)) as [t.Mixed, t.Mixed, ...t.Mixed[]]

export const TApiResponse = t.type({
  id: idCodec,
  method: t.keyof(ApiSchema),
  input: t.union(codecs)
})

export type ApiResponse = t.TypeOf<typeof TApiResponse>

export const apiMapping: { [K in keyof ApiSchema]: ServerApiMethod<K> } = {
  document,
  nodeCreate,
  nodeDelete,
  updateNodeSettings,
  nodeSettings
}
