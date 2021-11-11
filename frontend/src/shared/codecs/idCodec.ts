import * as t from 'io-ts'
import { identity } from 'io-ts'
import { v4 as uuid } from 'uuid'

import { Id } from '../types/domain/id'

const isId = (input: any): input is Id => typeof input === 'string'
export const newId = (): Id => uuid() as Id

export const idCodec: t.Type<Id, string> = new t.Type<Id>(
  'id',
  isId,
  (input, context) => (isId(input) ? t.success(input) : t.failure(input, context)),
  identity
)
