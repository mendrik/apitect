import { pipe, propOr } from 'ramda'

import { Fn, Maybe } from '../../shared/types/generic'

export const useSetJwt = (
  afterSet: Fn = () => void 0
): ((rec: { token: Maybe<string> }) => void) => {
  const setJWT = (jwt: Maybe<string>) =>
    jwt != null ? localStorage.setItem('jwt', jwt) : localStorage.removeItem('jwt')

  return pipe(propOr(undefined, 'token'), setJWT, afterSet)
}
