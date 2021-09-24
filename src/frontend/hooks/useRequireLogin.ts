import { useReadLocalStorage } from 'usehooks-ts'

import { Maybe } from '../../utils/maybe'

export const useRequireLogin = () => {
  const jwt: Maybe<string> = useReadLocalStorage('jwt')
  if (jwt == null) {
    throw Promise.resolve('Login required')
  }
}
