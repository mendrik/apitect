import { Pred } from 'ramda'

export const failOn =
  <T, E extends Error = Error>(pred: Pred, error: string | ((errData: T) => E)) =>
  (data: any): T | never => {
    const check = (c: any): c is T => pred(data)
    if (check(data)) {
      if (typeof error === 'function') {
        throw error(data)
      } else {
        throw new Error(error)
      }
    }
    return data as T
  }
