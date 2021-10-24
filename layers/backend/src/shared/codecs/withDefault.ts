import * as t from 'io-ts'

export const withDefault = <T extends t.Mixed>(
  type: T,
  defaultValue: t.OutputOf<T>
): t.Type<t.TypeOf<T>, t.OutputOf<T>> =>
  new t.Type(
    `withDefault(${type.name}, ${JSON.stringify(defaultValue)})`,
    type.is,
    (v, c) => type.validate(v != null ? v : defaultValue, c),
    type.encode
  )
