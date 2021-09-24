import { Maybe } from '../../utils/maybe'

type PromisedHook<T> = [(...args: any[]) => Promise<T>, boolean, Maybe<Error>]
export const usePromise = <T>(fn: (...args: any[]) => Promise<T>): PromisedHook<T> => {
  return [fn, false, null]
}
