import { useContext } from 'react'
import { Fn } from 'shared/types/generic'

import { userContext } from '../contexts/user'
import $appStore from '../stores/$appStore'
import { logout } from '../utils/restApi'
import usePromise from './usePromise'

export const useLogout = (): Fn<Promise<any>> => {
  const { setJwt } = useContext(userContext)
  const doLogout = usePromise('doLogout', logout)

  return () =>
    doLogout
      .trigger()
      .then(() => setJwt(undefined))
      .then(() => $appStore.reset())
}
