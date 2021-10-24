import * as t from 'io-ts'

export const chainCodec = <A extends t.Any, B extends t.Any>(a: A, b: B) => a.pipe(b)
