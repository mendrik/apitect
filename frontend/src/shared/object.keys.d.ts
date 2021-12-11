import { UnionToTuple } from './types/generic'

// prettier-ignore
type ObjectKeys<T> = T extends {}
  ? UnionToTuple<keyof T>
  : T extends number
    ? []
    : T extends Array<unknown> | string
      ? string[]
      : never

export interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>
}
