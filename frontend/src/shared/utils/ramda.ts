import {
  add,
  always,
  aperture,
  append,
  apply,
  converge,
  curry,
  findIndex,
  groupBy,
  head,
  identity,
  indexOf,
  insert,
  isNil,
  join,
  juxt,
  last,
  Lens,
  lens,
  map,
  nth,
  nthArg,
  o,
  pickBy,
  pipe,
  Pred,
  prop,
  remove,
  replace,
  reverse,
  tail,
  toLower,
  toUpper,
  tryCatch,
  unapply,
  unless,
  update,
  useWith
} from 'ramda'
import { allEqualTo, findOr, isNotNil, sliceFrom, sliceTo } from 'ramda-adjunct'

import { ArgFn, Fn, Maybe } from '../types/generic'

type Str = string

export const capitalize = pipe<[Str], Str, Str[], Str>(
  toLower,
  juxt([o<Str, Str, Str>(toUpper, head), tail]),
  join('')
)

export const safeParseJson = <T>(data: unknown): T | undefined =>
  tryCatch(d => JSON.parse(`${d}`), always(undefined))(data)

export const satiated = pickBy(isNotNil)

export const asNumber = (val: Maybe<Str>): number =>
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

// returns a circular next element where last + 1 jumps to head
export const next =
  (pred: Pred) =>
  <T>(list: T[]): Maybe<T> =>
    $next(pred)(list)

// returns a circular previous element where head - 1 jumps to last
export const prev =
  (pred: Pred) =>
  <T>(list: T[]): Maybe<T> =>
    $next(pred)(reverse(list))

export const decapitalizeFirst = unless(isNil, replace(/^./, toLower))

export const updateArrayBy = curry(<T>(pred: Pred, updateFn: ArgFn<T, T>, arr: T[]) => {
  const index = findIndex(pred, arr)
  return update(index, updateFn(arr[index]), arr)
})

export const isCyclic =
  (pathMap: Record<Str, Str>) =>
  (node: Str, visited: Str[] = []): boolean => {
    if (node === pathMap[node] || visited.includes(node)) return true
    if (pathMap[node] == null) return false
    return isCyclic(pathMap)(pathMap[node], [node, ...visited])
  }

type Pluck<T extends readonly any[], K extends Str> = T[number][K]

export const mapByProperty =
  <T extends Record<Str, any>>(p: keyof T & Str) =>
  <T2 extends T>(arr: readonly T2[]): Record<Pluck<typeof arr, typeof p>, T2> =>
    map(head, groupBy(prop(p), arr))

export const insertStr = curry(
  (index: number, text: Str, input: Str): Str => insert(index, text, input.split('')).join('')
)

export const removeSlice = curry(
  (index: number, end: number, input: Str): Str =>
    remove(index, Math.abs(end - index), input.split('')).join('')
)

export const replaceSlice = curry(
  (index: number, end: number, replacement: Str, input: Str): Str =>
    pipe(juxt([sliceTo(index), always(replacement), sliceFrom(end)]), join(''))(input)
)

export const removeCharAt = curry(
  (index: number, input: Str): Str => remove(index, 1, input.split('')).join('')
)

export const removeCharBefore = curry(
  (index: number, input: Str): Str => remove(index - 1, 1, input.split('')).join('')
)

export const undef = always(undefined)

export const matches = <TArgs extends any[]>(
  ...predicates: Pred[]
): ((...args: TArgs) => boolean) => useWith(unapply(allEqualTo(true)), predicates as any) as any

export const matchesArr = <TArgs extends any[]>(
  ...predicates: Pred[]
): ((args: TArgs) => boolean) => apply(matches(...predicates))

const nextIndex = <T>(item: T): ((arr: T[]) => number) => pipe(indexOf(item), add(1))

export const lensNext = <T>(item: T): Lens<T[], T | undefined> =>
  lens(
    converge<T | undefined, [Fn<number>, Fn<T[]>]>(nth, [nextIndex(item), identity]),
    converge<T[], [Fn<number>, Fn<T>, Fn<T[]>]>(update, [
      pipe(nthArg(1), nextIndex(item)),
      nthArg(0),
      nthArg(1)
    ])
  ) as any
