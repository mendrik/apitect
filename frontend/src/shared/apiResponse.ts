import { literal, number, object, string, union, ZodLiteral, ZodObject, ZodString } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ApiSchema } from './api'
import { idCodec } from './codecs/idCodec'
import { ApiMethod, ApiMethods, ApiOutput, ApiParam, ApiResult } from './types/api'

export type ServerParam<T extends ApiMethod> = ApiParam<T> extends undefined
  ? { email: string; docId: string }
  : { email: string; docId: string; payload: ApiParam<T> }

export type ServerApiMethod<T extends ApiMethod> = (obj: ServerParam<T>) => Promise<ApiResult<T>>

const apiMethods = Object.keys(ApiSchema) as ApiMethods
type Codec<T extends ApiMethod> = ZodObject<{
  id: ZodString
  method: ZodLiteral<T>
  payload: ApiOutput<T>
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
    payload: ApiSchema[k][1]
  })
) as Codecs<ApiMethods>

export const ZApiError = object({
  error: literal('error'),
  id: idCodec,
  status: number(),
  message: string(),
  field: string().optional()
})

export type ApiError = TypeOf<typeof ZApiError>

export const ZApiResponse = union(codecs)

export type ApiResponse = TypeOf<typeof ZApiResponse>
