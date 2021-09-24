import { andThen, mergeAll, pipe, reduce, toPairs } from 'ramda'

export type Promised<T> = {
  [P in keyof T]: T[P] | Promise<T[P]>
}

export const promiseAll: <T>(arr: Promise<T>[]) => Promise<T[]> = Promise.all.bind(Promise)

export const resolvePromised: <T>(obj: Promised<T>) => Promise<T> = pipe(
  toPairs,
  reduce(
    (acc: any[], [k, v]) => [
      ...acc,
      v instanceof Promise ? v.then(v => ({ [k]: v })) : Promise.resolve({ [k]: v })
    ],
    []
  ),
  promiseAll,
  andThen(mergeAll as any)
)
