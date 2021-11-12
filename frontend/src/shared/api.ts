import * as t from 'io-ts'

import { idCodec } from './codecs/idCodec'
import { TDocument } from './types/domain/document'
import { TNode } from './types/domain/tree'
import { TNewNode } from './types/forms/newNode'
import { TNodeSettings } from './types/forms/nodetypes/nodeSettings'
import { TNodeDeletedResponse } from './types/serverMessages'

export const ApiSchema = {
  document: [t.undefined, TDocument],
  nodeSettings: [idCodec, TNodeSettings],
  updateNodeSettings: [TNodeSettings, t.void],
  nodeDelete: [idCodec, TNodeDeletedResponse],
  nodeCreate: [TNewNode, TNode]
} as const

export type ApiSchema = typeof ApiSchema
export type ApiMethod = keyof ApiSchema

export type Input<T extends ApiMethod> = ApiSchema[T][0]
export type Output<T extends ApiMethod> = ApiSchema[T][1]

export type Api = {
  [K in ApiMethod]: t.OutputOf<Input<K>> extends undefined
    ? () => Promise<t.OutputOf<Output<K>>>
    : (input: t.OutputOf<Input<K>>) => Promise<t.OutputOf<Output<K>>>
}
