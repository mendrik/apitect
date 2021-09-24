import { Pred } from 'ramda'

export const failOn =
  <T>(pred: Pred, message: string) =>
  (data: any): T | never => {
    const check = (data: any): data is T => pred(data)
    if (check(data)) {
      throw new Error(message)
    }
    return data as T
  }
