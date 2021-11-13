import * as t from 'io-ts'

export const nullable = <T>(type: t.Type<T>): t.Type<T | null> => t.union([type, t.null])
