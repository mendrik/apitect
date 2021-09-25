import { Pred } from 'ramda'

export const failOn =
  <T, E extends Error = Error>(pred: Pred, error: (errData: T) => E) =>
  (data: any): T | never => {
    const check = (c: any): c is T => pred(data)
    if (check(data)) {
      throw error
    }
    return data as T
  }
