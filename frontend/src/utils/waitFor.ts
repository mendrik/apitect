import { Maybe } from '../shared/types/generic'

const suspense = Promise.resolve()

export const waitFor = <T>(something: Maybe<T>): something is NonNullable<T> => {
  if (something == null) {
    throw suspense
  }
  return true
}
