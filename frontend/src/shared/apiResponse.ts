import * as t from 'io-ts'
import { keys } from 'ramda'

import { ApiMethod, ApiParam, ApiResult, ApiSchema } from './api'
import { idCodec } from './codecs/idCodec'
import { UnionToTuple } from './types/unionToTuple'

type ServerParam<T extends ApiMethod> = {
  email: string
  payload: ApiParam<T>
}

export type ServerApiMethod<T extends ApiMethod> = (obj: ServerParam<T>) => Promise<ApiResult<T>>

type Codec<T extends ApiMethod> = {
  [K in T]: t.TypeC<{
    id: t.StringC
    method: t.LiteralC<K>
    payload: ApiSchema[K][1]
  }>
}[T]

type Codecs = Codec<ApiMethod>

const codecs = keys(ApiSchema).map(k =>
  t.type({
    id: idCodec,
    method: t.literal(k),
    payload: ApiSchema[k][1]
  })
) as UnionToTuple<Codecs>

export const TApiResponse = t.union(codecs)

export type ApiResponse = t.TypeOf<typeof TApiResponse>
