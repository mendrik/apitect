import { literal, object, union, ZodLiteral, ZodObject, ZodString } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ApiSchema } from '../api'
import { idCodec } from '../codecs/idCodec'
import type { ApiInput, ApiMethod, ApiMethods } from './api'
import { UnionToTuple } from './generic'

const apiMethods = Object.keys(ApiSchema) as ApiMethods

type AllCodecs = {
  [K in ApiMethod]: ZodObject<{
    id: ZodString
    method: ZodLiteral<K>
    payload: ApiInput<K>
  }>
}[ApiMethod]

const codecs = apiMethods.map(k =>
  object({
    id: idCodec,
    method: literal(k),
    payload: ApiSchema[k][0]
  })
) as UnionToTuple<AllCodecs>

export const ZApiRequest = union(codecs)

export type ApiRequest = TypeOf<typeof ZApiRequest>
