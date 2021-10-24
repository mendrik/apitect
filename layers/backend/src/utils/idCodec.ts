import * as t from 'io-ts'
import { ObjectId } from 'mongodb'

const isId = (input: any): input is ObjectId => ObjectId.isValid(input)

export const idCodec: t.Type<ObjectId> = new t.Type<ObjectId>(
  'objectId',
  isId,
  (input, context) => (isId(input) ? t.success(new ObjectId(input)) : t.failure(input, context)),
  t.identity
)
