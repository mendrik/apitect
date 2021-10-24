import { andThen, mergeAll, pipe, reduce, toPairs } from 'ramda'
import { Milliseconds } from '../types/generic'

export type Promised<T> = {
  [P in keyof T]: T[P] | Promise<T[P]>
}

export const promiseAll: <T>(arr: Promise<T>[]) => Promise<T[]> = Promise.all.bind(Promise)

export const resolvePromised: <T>(obj: Promised<T>) => Promise<T> = pipe(
  toPairs,
  reduce(
    (acc: any[], [k, v]) => [
      ...acc,
      v instanceof Promise ? v.then(vv => ({ [k]: vv })) : Promise.resolve({ [k]: v })
    ],
    []
  ),
  promiseAll,
  andThen(mergeAll as any)
)

export const promiseFn =
  <FUNC extends (...args: any[]) => any>(
    fn: FUNC
  ): ((...args: Parameters<FUNC>) => Promise<ReturnType<FUNC>>) =>
  (...args) =>
    new Promise((resolve, reject) => {
      try {
        resolve(fn(...args))
      } catch (e) {
        reject(e)
      }
    })

export const delay =
  (wait: Milliseconds) =>
  <T>(data: T) =>
    new Promise<T>(res => setTimeout(() => res(data), wait))

export const delayCatch = (wait: Milliseconds) => (e: unknown) =>
  new Promise((_res, rej) => setTimeout(() => rej(e), wait))
