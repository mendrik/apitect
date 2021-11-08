import {
  always,
  aperture,
  append,
  assoc,
  compose,
  converge,
  head,
  identity,
  join,
  juxt,
  last,
  pipe,
  Pred,
  prop,
  reduce,
  reverse,
  tail,
  toPairs,
  toUpper,
  tryCatch
} from 'ramda'
import { findOr } from 'ramda-adjunct'

import { Fn, Maybe } from '../types/generic'

export const capitalize = compose(join(''), juxt([compose(toUpper, head), tail]))

export const assocBy =
  <K extends string, R>(field: K, func: Fn<R>) =>
  <U>(obj: U): U & Record<K, R> =>
    converge(assoc(field), [func, identity])(obj)

export const safeParse = <T>(data: any): T | undefined =>
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
