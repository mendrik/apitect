import {
  always,
  aperture,
  append,
  assoc,
  compose,
  converge,
  curry,
  either,
  findIndex,
  head,
  identity,
  isNil,
  join,
  juxt,
  last,
  pipe,
  Pred,
  prop,
  propEq,
  reduce,
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

import { AFn, Fn, Maybe } from '../types/generic'

export const capitalize = compose(join(''), juxt([compose(toUpper, head), tail]), toLower)

export const assocBy =
  <K extends string, R>(field: K, func: Fn<R>) =>
  <U>(obj: U): U & Record<K, R> =>
    converge(assoc(field), [func, identity])(obj)

export const safeParseJson = <T>(data: any): T | undefined =>
  tryCatch(d => JSON.parse(`${d}`), always(undefined))(data)

export const satiated = <T>(data: Record<string, T>): Record<string, NonNullable<T>> =>
  reduce((p, [k, v]) => (v == null ? p : { ...p, [k]: v }), {}, toPairs(data))

export const field =
  <T>(p: keyof T) =>
  (obj: T) =>
    prop(p, obj)

export const ensure = <T extends NonNullable<any>>(obj: Maybe<T>): T => {
  if (obj == null) {
    throw Error('object must not be null')
  }
  return obj
}

// prettier-ignore
const $next: (p:Pred) => <T>(l: T[]) => Maybe<T> = (pred: Pred) =>
  pipe<any, any, any, any,any>(
    converge(append, [head, identity]),
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

export const spaceOrEnter = either(propEq<any>('code', 'Space'), propEq<any>('key', 'Enter'))

export const decapitalizeFirst = unless(isNil, replace(/^./, toLower))

export const updateArrayBy = curry(<T>(pred: Pred, updateFn: AFn<T, T>, arr: T[]) => {
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
