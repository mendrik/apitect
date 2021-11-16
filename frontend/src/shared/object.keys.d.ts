import { UnionToTuple } from './types/generic'

// prettier-ignore
type ObjectKeys<T> =
  T extends { } ? UnionToTuple<keyof T> :
  T extends number ? [] :
  T extends Array<any> | string ? string[] :
  never;

export interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>
}

const p = { aKey: 1, bKey: 2 } as const

type X = ObjectKeys<typeof p>

const keys = Object.keys<typeof p>(p)
