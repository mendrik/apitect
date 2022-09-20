import { Maybe } from '~shared/types/generic'

export const existsOrThrow = <T>(maybe: Maybe<T>): NonNullable<T> | never => {
  if (maybe == null) {
    throw Error('existsOrThrow was not defined')
  }
  return maybe
}
