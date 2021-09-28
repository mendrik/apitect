import { pipe, propOr } from 'ramda'
import { useLocalStorage } from 'usehooks-ts'

import { Fn } from '../../utils/types'

export const useSetJwt = (afterSet: Fn = () => void 0): ((rec: { token: string }) => void) => {
  const [, setJWT] = useLocalStorage('jwt', undefined)

  return pipe(propOr(undefined, 'token'), setJWT, afterSet)
}
