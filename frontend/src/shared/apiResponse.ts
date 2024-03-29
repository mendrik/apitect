import {
  literal,
  nativeEnum,
  number,
  object,
  string,
  union,
  ZodLiteral,
  ZodObject,
  ZodString
} from 'zod'
import { TypeOf } from 'zod/lib/types'
import { ApiMethod, ApiMethods, ApiOutput, ApiParam, ApiResult } from '~shared/apiTypes'
import { NotificationType } from '~shared/types/domain/notification'

import { ApiSchema } from './api'
import { idCodec } from './codecs/idCodec'
import { UnionToTuple } from './types/generic'

export type ServerParam<T extends ApiMethod> = {
  email: string
  docId: string
  payload: ApiParam<T>
}

export type ServerApiMethod<T extends ApiMethod> = (obj: ServerParam<T>) => Promise<ApiResult<T>>

const apiMethods = Object.keys(ApiSchema) as ApiMethods

type AllCodecs = {
  [K in ApiMethod]: ZodObject<{
    id: ZodString
    method: ZodLiteral<K>
    payload: ApiOutput<K>
  }>
}[ApiMethod]

const codecs = apiMethods.map(k =>
  object({
    id: idCodec,
    method: literal(k),
    payload: ApiSchema[k][1]
  })
) as UnionToTuple<AllCodecs>

export const ZApiResponse = union(codecs)
export type ApiResponse = TypeOf<typeof ZApiResponse>

export const ZApiError = object({
  error: literal('error'),
  id: idCodec,
  status: number(),
  message: string(),
  field: string().optional(),
  title: string().optional(),
  notificationType: nativeEnum(NotificationType).optional(),
  uniqueId: idCodec.optional()
})

export type ApiError = TypeOf<typeof ZApiError>
