import { Primitives } from 'ts-pattern/lib/types/helpers'
import { TypeOf } from 'zod/lib/types'

import { ApiSchema } from '../api'
import { UnionToTuple } from './generic'

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
