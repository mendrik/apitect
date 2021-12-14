import {
  always,
  aperture,
  append,
  assoc,
  compose,
  converge,
  curry,
  findIndex,
  groupBy,
  head,
  identity,
  insert,
  isNil,
  join,
  juxt,
  last,
  map,
  pipe,
  Pred,
  prop,
  reduce,
  remove,
  replace,
  reverse,
  tail,
  toLower,
  toPairs,
  toUpper,
  tryCatch,
  unless,
  update
} from 'ramda'
import { findOr } from 'ramda-adjunct'

import { ArgFn, Fn, Maybe } from '../types/generic'

export const capitalize = compose(join(''), juxt([compose(toUpper, head), tail]), toLower)

export const assocBy =
  <K extends string, R>(field: K, func: Fn<R>) =>
  <U extends object>(obj: U) =>
    converge(assoc(field) as any, [func, identity])(obj)

export const safeParseJson = <T>(data: unknown): T | undefined =>
  tryCatch(d => JSON.parse(`${d}`), always(undefined))(data)

export const satiated = <T>(data: Record<string, T>): Record<string, NonNullable<T>> =>
  reduce((p, [k, v]) => (v == null ? p : { ...p, [k]: v }), {}, toPairs(data))

export const field =
  <T>(p: keyof T) =>
  (obj: T) =>
    prop(p, obj)

export const toObj =
  <T extends object>(prop: keyof T) =>
  (value: string): T =>
    ({ [prop]: value } as T)

export const asNumber = (val: Maybe<string>) => (val != null ? parseInt(val, 10) : NaN)

export const ensure = <T extends NonNullable<unknown>>(obj: Maybe<T>): T => {
  if (obj == null) {
    throw Error('object must not be null')
  }
  return obj
}

// prettier-ignore
const $next: (p:Pred) => <T>(l: T[]) => Maybe<T> = (pred: Pred) =>
  pipe<any, any, any, any, any>(
    converge(append as any, [head, identity]),
    aperture(2),
    findOr([], pipe(head, pred)),
    last
  )

export const next =
  (pred: Pred) =>
  <T>(list: T[]): Maybe<T> =>
    $next(pred)(list)

export const prev =
  (pred: Pred) =>
  <T>(list: T[]): Maybe<T> =>
    $next(pred)(reverse(list))

export const isNumeric: Pred = (str: string) => !isNaN(Number(str))

export const decapitalizeFirst = unless(isNil, replace(/^./, toLower))

export const updateArrayBy = curry(<T>(pred: Pred, updateFn: ArgFn<T, T>, arr: T[]) => {
  const index = findIndex(pred, arr)
  return update(index, updateFn(arr[index]), arr)
})

export const isCyclic =
  (pathMap: Record<string, string>) =>
  (node: string, visited: string[] = []): boolean => {
    if (node === pathMap[node] || visited.includes(node)) return true
    if (pathMap[node] == null) return false
    return isCyclic(pathMap)(pathMap[node], [node, ...visited])
  }

export const byProp =
  <T, K extends keyof T & string>(p: K) =>
  (arr: T[]): Record<K, T> =>
    map(head, groupBy(prop<K, T>(p) as any, arr))

export const insertStr = curry((index: number, text: string, input: string) =>
  insert(index, text, input.split('')).join('')
)

export const removeSlice = curry((index: number, end: number, input: string): string =>
  remove(index, end - index + 1, input.split('')).join('')
)

export const removeCharAt = curry((index: number, input: string): string =>
  remove(index, 1, input.split('')).join('')
)

export const removeCharBefore = curry((index: number, input: string): string =>
  remove(index - 1, 1, input.split('')).join('')
)
