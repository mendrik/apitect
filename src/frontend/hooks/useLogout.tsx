import { useContext } from 'react'

import { Fn } from '../../shared/types/generic'
import { UserContext, userContext } from '../contexts/user'
import { logout } from '../utils/api'
import usePromise from './usePromise'

export const useLogout = (): [UserContext, Fn<Promise<any>>] => {
  const userState = useContext(userContext)
  const doLogout = usePromise('doLogout', logout)

  return [
    userState,
    () =>
      doLogout
        .trigger()
        .then(() => localStorage.removeItem('jwt'))
        .then(userState.trigger)
  ]
}
