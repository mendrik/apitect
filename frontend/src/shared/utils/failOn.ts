import { complement, Pred } from 'ramda'

export const failOn =
  <T, E extends Error = Error>(pred: Pred, error?: Error | string | ((errData: T) => E)) =>
  (data: any): T | never => {
    const check = (c: any): c is T => pred(data)
    if (check(data)) {
      if (typeof error === 'function') {
        throw error(data)
      } else if (error instanceof Error) {
        throw error
      } else {
        throw new Error(error)
      }
    }
    return data as T
  }

export const failUnless =
  <T, E extends Error = Error>(pred: Pred, error: Error | string | ((errData: T) => E)) =>
  (data: any): T | never =>
    failOn(complement(pred), error)(data)
