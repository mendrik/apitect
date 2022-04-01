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
import { findOr, sliceFrom, sliceTo } from 'ramda-adjunct'

import { ArgFn, Fn, Maybe } from '../types/generic'

export const capitalize = compose(join(''), juxt([compose(toUpper, head), tail]), toLower)

export const assocBy =
  <K extends string, R>(field: K, func: Fn<R>) =>
  <U extends object>(obj: U) =>
    converge(assoc(field), [func, identity])(obj)

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

export const asNumber = (val: Maybe<string>): number =>
  val != null ? parseFloat(val.replace(/,/, '.')) : NaN

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

type Pluck<T extends readonly any[], K extends string> = T[number][K]

export const mapByProperty =
  <T extends Record<string, any>>(p: keyof T & string) =>
  <T2 extends T>(arr: readonly T2[]): Record<Pluck<typeof arr, typeof p>, T2> =>
    map(head, groupBy(prop(p), arr))

export const insertStr = curry((index: number, text: string, input: string) =>
  insert(index, text, input.split('')).join('')
)

export const removeSlice = curry((index: number, end: number, input: string): string =>
  remove(index, Math.abs(end - index), input.split('')).join('')
)

export const replaceSlice = curry(
  (index: number, end: number, replacement: string, input: string): string =>
    pipe(juxt([sliceTo(index), always(replacement), sliceFrom(end)]), join(''))(input)
)

export const removeCharAt = curry((index: number, input: string): string =>
  remove(index, 1, input.split('')).join('')
)

export const removeCharBefore = curry((index: number, input: string): string =>
  remove(index - 1, 1, input.split('')).join('')
)

export const undef = always(undefined)
