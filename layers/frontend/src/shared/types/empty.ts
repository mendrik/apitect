import * as t from 'io-ts'

export const TEmpty = t.type({})

export type Empty = t.TypeOf<typeof TEmpty>
