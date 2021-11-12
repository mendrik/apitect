import * as t from 'io-ts'
import { keys } from 'ramda'

import { ApiSchema, Input } from '../api'
import { idCodec } from '../codecs/idCodec'
import { UnionToTuple } from './unionToTuple'

type Codec<T extends keyof ApiSchema> = {
  [K in T]: t.TypeC<{
    id: t.StringC
    method: t.LiteralC<K>
    payload: Input<K>
  }>
}[T]

type Codecs = Codec<keyof ApiSchema>

const codecs = keys(ApiSchema).map(k =>
  t.type({
    id: idCodec,
    method: t.literal(k),
    payload: ApiSchema[k][0]
  })
) as UnionToTuple<Codecs>

export const TApiRequest = t.union(codecs)

export type ApiRequest = t.TypeOf<typeof TApiRequest>
