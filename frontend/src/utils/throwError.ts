import { Fn } from '~shared/types/generic'

export const throwError =
  (msg: string): Fn =>
  (): never => {
    throw Error(msg)
  }
