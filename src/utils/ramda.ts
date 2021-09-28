import { assoc, compose, converge, head, identity, join, juxt, tail, toUpper } from 'ramda'

import { Fn } from './types'

export const capitalize = compose(join(''), juxt([compose(toUpper, head), tail]))

export const assocBy =
  <K extends string, R>(prop: K, func: Fn<R>) =>
  <U>(obj: U): U & Record<K, R> =>
    converge(assoc(prop), [func, identity])(obj)
