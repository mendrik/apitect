import { assoc, converge, keys, mergeDeepRight, omit, pickAll, reduce } from 'ramda'

export type PickRenameMulti<
  R extends { [K: string]: string },
  T extends { [s in keyof R]: any }
> = {
  [P in keyof T as P extends keyof R ? R[P] : P]: T[P]
}

export const renameProps =
  <MAP extends { [K: string]: string }>(keysMap: MAP) =>
  <T extends { readonly [s in keyof MAP]: any }>(obj: T): PickRenameMulti<MAP, T> =>
    reduce(
      (acc, key) => assoc(keysMap[key], obj[key], acc),
      {},
      keys(pickAll(keys(keysMap) as any, obj))
    ) as any

export const id = converge(mergeDeepRight, [renameProps({ _id: 'id' } as const), omit(['_id'])])
