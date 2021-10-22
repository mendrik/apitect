import * as t from 'io-ts'

const isId = (i: any): i is any => 'toHexString' in i

export const hexString = new t.Type<string>(
  'objectId',
  isId,
  (input, context) => (isId(input) ? t.success(input.toHexString()) : t.failure(input, context)),
  () => 'not supported'
)
