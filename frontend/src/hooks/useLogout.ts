import { useLocalStorage } from 'react-use'
import { User } from '~shared/types/domain/user'
import { Fn } from '~shared/types/generic'

import { resetProject } from '../events/reset'
import { whoAmIFx } from '../events/user'
import { logout } from '../utils/restApi'

export const useLogout = (): Fn<Promise<User | null>> => {
  const [_, setJwt] = useLocalStorage('jwt')
  return () =>
    logout()
      .then(() => setJwt(null))
      .then(resetProject)
      .then(whoAmIFx)
}
