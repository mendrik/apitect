import * as t from 'io-ts'

import { idCodec } from './codecs/idCodec'
import { TNode } from './types/domain/tree'
import { TNewNode } from './types/forms/newNode'
import { TNodeSettings } from './types/forms/nodetypes/nodeSettings'
import { TNodeDeletedResponse } from './types/serverMessages'

export const ApiSchema = {
  document: [t.undefined, t.void],
  nodeSettings: [idCodec, TNodeSettings],
  updateNodeSettings: [TNodeSettings, t.void],
  nodeDelete: [idCodec, TNodeDeletedResponse],
  nodeCreate: [TNewNode, TNode]
} as const

export type ApiSchema = typeof ApiSchema

export type Api = {
  [K in keyof ApiSchema]: (
    input: t.OutputOf<ApiSchema[K][0]>
  ) => Promise<t.OutputOf<ApiSchema[K][1]>>
}
