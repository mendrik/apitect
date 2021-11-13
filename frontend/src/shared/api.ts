import * as t from 'io-ts'
import { Primitives } from 'ts-pattern/lib/types/helpers'

import { idCodec } from './codecs/idCodec'
import { nullable } from './codecs/nullable'
import { TDocument } from './types/domain/document'
import { TNode } from './types/domain/tree'
import { TNewNode } from './types/forms/newNode'
import { TNodeSettings } from './types/forms/nodetypes/nodeSettings'
import { TNodeCreated } from './types/response/nodeCreated'
import { TNodeDeleted } from './types/response/nodeDeleted'

export const ApiSchema = {
  document: [t.undefined, TDocument],
  nodeSettings: [idCodec, nullable(TNodeSettings)],
  updateNodeSettings: [TNodeSettings, TNode],
  nodeDelete: [idCodec, TNodeDeleted],
  nodeCreate: [TNewNode, TNodeCreated]
} as const

export type ApiSchema = typeof ApiSchema
export type ApiMethod = keyof ApiSchema
export type FormApiMethod = keyof {
  [K in keyof ApiSchema as t.OutputOf<ApiSchema[K][0]> extends undefined | Primitives
    ? never
    : K]: 0
}

type Input<T extends ApiMethod> = ApiSchema[T][0]
type Output<T extends ApiMethod> = ApiSchema[T][1]

export type Api = {
  [K in ApiMethod]: t.OutputOf<Input<K>> extends undefined
    ? () => Promise<t.OutputOf<Output<K>>>
    : (input: t.OutputOf<Input<K>>) => Promise<t.OutputOf<Output<K>>>
}

export type ApiParam<T extends ApiMethod> = t.OutputOf<Input<T>>
export type ApiResult<T extends ApiMethod> = t.OutputOf<Output<T>>
