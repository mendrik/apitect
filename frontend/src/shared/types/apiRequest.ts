import { literal, object, union, ZodLiteral, ZodObject, ZodString } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ApiInput, ApiMethod, ApiMethods, ApiSchema } from '../api'
import { idCodec } from '../codecs/idCodec'

const apiMethods = Object.keys(ApiSchema) as ApiMethods
type Codec<T extends ApiMethod> = ZodObject<{
  id: ZodString
  method: ZodLiteral<T>
  payload: ApiInput<T>
}>

type Codecs<T extends ApiMethod[]> = T extends [infer H, ...infer Tail]
  ? H extends ApiMethod
    ? [Codec<H>, ...(Tail extends [ApiMethod, ...ApiMethod[]] ? Codecs<Tail> : [])]
    : never
  : never

const codecs = apiMethods.map(k =>
  object({
    id: idCodec,
    method: literal(k),
    payload: ApiSchema[k][0]
  })
) as Codecs<ApiMethods>

export const ZApiRequest = union(codecs)

export type ApiRequest = TypeOf<typeof ZApiRequest>
