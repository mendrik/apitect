import React, { createContext, FC } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { Maybe } from '../../shared/types/generic'
import useInstantPromise from '../hooks/useInstantPromise'
import { State } from '../hooks/usePromise'
import { User } from '../types/user'
import { whoAmI } from '../utils/api'

export type UserContext = {
  jwt: Maybe<string>
  setJwt: (jwt: Maybe<{ token: string }>) => void
  user: Maybe<User>
  status: State<any>['status']
}

export const userContext = createContext<UserContext>({
  user: undefined,
  status: 'idle',
  jwt: undefined,
  setJwt: () => void 0
})

export const WithUser: FC = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage<Maybe<string>>('jwt', undefined)
  const state = useInstantPromise('whoAmI', whoAmI, () => jwt != null)
  if (state.error) {
    throw Error('Failed to load user')
  }
  if (state.status === 'running') {
    throw Promise.resolve('Loading user')
  }

  return (
    <userContext.Provider
      value={{
        user: state.data,
        status: state.status,
        jwt,
        setJwt: j => {
          if (j) {
            setJwt(j.token)
          } else {
            localStorage.removeItem('jwt')
          }
          state.trigger()
        }
      }}
    >
      {children}
    </userContext.Provider>
  )
}