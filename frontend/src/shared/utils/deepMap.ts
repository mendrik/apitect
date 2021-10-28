import { cond, curry, map, mapObjIndexed, T } from 'ramda'
import { isPrototypeOf } from 'ramda-adjunct'

type AnyFunc = <T, R>(...a: any[]) => any

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

export const deepMap: DeepMap = curry((fn: AnyFunc) =>
  cond([
    [isPrototypeOf(Object), v => mapObjIndexed(deepMap(fn), v)],
    [isPrototypeOf(Array), v => map(deepMap(fn), v)],
    [T, fn]
  ])
)
