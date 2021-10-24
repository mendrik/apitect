import * as t from 'io-ts'

type Hex = { toHexString: () => string }
const isId = (i: any): i is Hex =>
  i != null && 'toHexString' in i && typeof i.toHexString === 'function'

export const hexString = new t.Type<string>(
  'objectId',
  isId as any,
  (input, context) => {
    if (typeof input === 'string') {
      return t.success(input)
    }
    return isId(input) ? t.success(input.toHexString()) : t.failure(input, context)
  },
  () => 'not supported'
)
