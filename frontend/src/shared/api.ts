import * as t from 'io-ts'

import { idCodec } from './codecs/idCodec'
import { TDocument } from './types/domain/document'
import { TNode } from './types/domain/tree'
import { TNewNode } from './types/forms/newNode'
import { TNodeSettings } from './types/forms/nodetypes/nodeSettings'
import { TNodeCreated } from './types/response/nodeCreated'
import { TNodeDeleted } from './types/response/nodeDeleted'

export const ApiSchema = {
  document: [t.undefined, TDocument],
  nodeSettings: [idCodec, TNodeSettings],
  updateNodeSettings: [TNodeSettings, TNode],
  nodeDelete: [idCodec, TNodeDeleted],
  nodeCreate: [TNewNode, TNodeCreated]
} as const

export type ApiSchema = typeof ApiSchema
export type ApiMethod = keyof ApiSchema

type Input<T extends ApiMethod> = ApiSchema[T][0]
type Output<T extends ApiMethod> = ApiSchema[T][1]

export type Api = {
  [K in ApiMethod]: t.OutputOf<Input<K>> extends undefined
    ? () => Promise<t.OutputOf<Output<K>>>
    : (input: t.OutputOf<Input<K>>) => Promise<t.OutputOf<Output<K>>>
}

export type ApiParam<T extends ApiMethod> = t.OutputOf<Input<T>>
export type ApiResult<T extends ApiMethod> = t.OutputOf<Output<T>>
