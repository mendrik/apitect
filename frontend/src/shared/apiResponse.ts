import * as t from 'io-ts'
import { keys } from 'ramda'

import { Api, ApiMethod, ApiSchema, Output } from './api'
import { idCodec } from './codecs/idCodec'
import { UnionToTuple } from './types/unionToTuple'

export type Respond<T extends ApiMethod> = <R extends t.OutputOf<Output<T>>>(payload: R) => R

export type ServerApiMethod<T extends ApiMethod> = ({
  email,
  payload
}: {
  email: string
  payload: Parameters<Api[T]>[0]
}) => ReturnType<Api[T]>

type Codec<T extends ApiMethod> = {
  [K in T]: t.TypeC<{
    id: t.StringC
    method: t.LiteralC<K>
    payload: Output<K>
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
