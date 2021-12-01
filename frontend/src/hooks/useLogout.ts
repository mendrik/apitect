import { useContext } from 'react'
import { Fn } from 'shared/types/generic'

import { userContext } from '../contexts/withUser'
import { resetStore } from '../events/project'
import { logout } from '../utils/restApi'

export const useLogout = (): Fn<Promise<any>> => {
  const { setJwt } = useContext(userContext)
  return () =>
    logout()
      .then(() => setJwt(undefined))
      .then(resetStore)
}