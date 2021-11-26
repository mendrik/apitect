import { Primitives } from 'ts-pattern/lib/types/helpers'
import { undefined as undef } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from './codecs/idCodec'
import { ZDocument } from './types/domain/document'
import { ZNode } from './types/domain/node'
import { TNewNode } from './types/forms/newNode'
import { ZNodeSettings } from './types/forms/nodetypes/nodeSettings'
import { ZProjectUsersSettings } from './types/forms/projectUsersSettings'
import { ZTagsSettings } from './types/forms/tagsSettings'
import { UnionToTuple } from './types/generic'
import { TNodeCreated } from './types/response/nodeCreated'
import { TNodeDeleted } from './types/response/nodeDeleted'

export const ApiSchema = {
  document: [undef(), ZDocument],
  nodeSettings: [idCodec, ZNodeSettings.nullable()],
  updateNodeSettings: [ZNodeSettings, ZNode],
  projectUsersSettings: [undef(), ZProjectUsersSettings.nullable()],
  updateProjectUsersSettings: [ZProjectUsersSettings, ZProjectUsersSettings],
  tagsSettings: [undef(), ZTagsSettings.nullable()],
  updateTagsSettings: [ZTagsSettings, ZTagsSettings],
  nodeDelete: [idCodec, TNodeDeleted],
  nodeCreate: [TNewNode, TNodeCreated]
} as const

export type ApiSchema = typeof ApiSchema
export type ApiMethod = keyof ApiSchema
export type ApiMethods = UnionToTuple<ApiMethod>

export type FormApiMethod = keyof {
  [K in keyof ApiSchema as TypeOf<ApiSchema[K][0]> extends undefined | Primitives ? never : K]: 0
}

export type ApiInput<T extends ApiMethod> = ApiSchema[T][0]
export type ApiOutput<T extends ApiMethod> = ApiSchema[T][1]

export type ApiParam<T extends ApiMethod> = TypeOf<ApiInput<T>>
export type ApiResult<T extends ApiMethod> = TypeOf<ApiOutput<T>>

export type Api = {
  [K in ApiMethod]: ApiParam<K> extends undefined
    ? () => Promise<ApiResult<K>>
    : (input: ApiParam<K>) => Promise<ApiResult<K>>
}
