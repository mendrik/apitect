import { cond, curry, map, mapObjIndexed, T } from 'ramda'
import { isArray, isPlainObj } from 'ramda-adjunct'

import { Fn } from '../types/generic'

// prettier-ignore
type $DeepMap<O, V, R> = {
  [K in keyof O]: O[K] extends object
    ? $DeepMap<O[K], V, R>
    : O[K] extends [infer H, ...infer Tail]
      ? [$DeepMap<H, V, R>, ...$DeepMap<Tail, V, R>]
      : O[K] extends V
        ? R
        : O[K]
}

type DeepMap = <V, R>(fn: (v: V) => R) => <O>(obj: O) => $DeepMap<O, V, R>

export const deepMap: DeepMap = curry((fn: Fn) =>
  cond([
    [isPlainObj, v => mapObjIndexed(deepMap(fn), v)],
    [isArray, v => map(deepMap(fn), v)],
    [T, fn]
  ])
)
