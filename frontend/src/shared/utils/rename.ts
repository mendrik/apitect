import { cond, curry, identity, keys, map, mapObjIndexed, reduce, T } from 'ramda'
import { isArray, isPlainObj } from 'ramda-adjunct'

export type PickRenameMulti<
  R extends { [K: string]: string },
  T extends { [s in keyof R]: any }
> = {
  [P in keyof T as P extends keyof R ? R[P] : P]: T[P]
}

export const renameProps =
  <MAP extends Record<string, string>>(keysMap: MAP) =>
  <T extends { readonly [s in keyof MAP]: any }>(obj: T): PickRenameMulti<MAP, T> =>
    reduce(
      (acc, key) =>
        key in keysMap
          ? { ...acc, [keysMap[key as keyof MAP]]: obj[key] }
          : { ...acc, [key]: obj[key] },
      {},
      keys(obj)
    ) as any

// prettier-ignore
type $DeepRename<O, MAP extends Record<string, string>> = {
  [K in keyof O]: O[K] extends { [K in keyof MAP]: any }
    ? $DeepRename<PickRenameMulti<MAP, O[K]>, MAP>
    : O[K] extends [infer H, ...infer Tail]
      ? [$DeepRename<H, MAP>, ...$DeepRename<Tail, MAP>]
      : O[K]
}

type DeepRename = <MAP extends Record<string, string>>(
  map: MAP
) => <O extends { [s in keyof MAP]: any }>(obj: O) => $DeepRename<PickRenameMulti<MAP, O>, MAP>

export const deepRename: DeepRename = curry(keyMap =>
  cond([
    [isPlainObj, (v: any) => mapObjIndexed(deepRename(keyMap))(renameProps(keyMap)(v))],
    [isArray, v => map(deepRename(keyMap), v)],
    [T, identity]
  ])
)

export const convertUnderscoreIds = deepRename({ _id: 'id' } as const)
