import { useContext } from 'react'

import { Fn } from '../../shared/types/generic'
import { userContext } from '../contexts/user'
import { messageReceived } from '../events/messages'
import { logout } from '../utils/api'
import usePromise from './usePromise'

export const useLogout = (): Fn<Promise<any>> => {
  const { setJwt } = useContext(userContext)
  const doLogout = usePromise('doLogout', logout)

  return () =>
    doLogout
      .trigger()
      .then(() => setJwt(undefined))
      .then(() => messageReceived({ type: 'RESET' }))
}
