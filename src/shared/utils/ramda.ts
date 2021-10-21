import {
  always,
  assoc,
  compose,
  converge,
  head,
  identity,
  join,
  juxt,
  prop,
  reduce,
  tail,
  toPairs,
  toUpper,
  tryCatch
} from 'ramda'

import { Fn } from '../types/generic'

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
