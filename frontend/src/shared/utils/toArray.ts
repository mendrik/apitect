import { isNil, of, pipe, reject } from 'ramda'

type ToArray = <V extends Exclude<any, undefined> | undefined>(
  v: V
) => V extends undefined ? [] : [V]

export const toArray: ToArray = pipe<any, any, any>(of, reject(isNil))
