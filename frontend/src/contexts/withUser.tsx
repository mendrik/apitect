import React, { createContext } from 'react'
import { User } from 'shared/types/domain/user'
import { Jsx, Maybe } from 'shared/types/generic'
import { useLocalStorage } from 'usehooks-ts'

import useInstantPromise from '../hooks/useInstantPromise'
import { State } from '../hooks/usePromise'
import { whoAmI } from '../utils/restApi'

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

export const WithUser = ({ children }: Jsx) => {
  const [jwt, setJwt] = useLocalStorage<Maybe<string>>('jwt', undefined)
  const state = useInstantPromise('whoAmI', whoAmI, () => jwt != null)
  if (state.error) {
    throw Error('Failed to load user')
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
          void state.trigger()
        }
      }}
    >
      {children}
    </userContext.Provider>
  )
}
