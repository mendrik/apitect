import React, { createContext } from 'react'
import { useLocalStorage } from 'react-use'
import { User } from 'shared/types/domain/user'
import { Jsx, Maybe } from 'shared/types/generic'

import { usePromise } from '../hooks/usePromise'
import { whoAmI } from '../utils/restApi'

export type UserContext = {
  jwt: Maybe<string>
  setJwt: (jwt: Maybe<{ token: string }>) => void
  user: Maybe<User>
}

export const userContext = createContext<UserContext>({
  user: undefined,
  jwt: undefined,
  setJwt: () => void 0
})

export const WithUser = ({ children }: Jsx) => {
  const [jwt, setJwt] = useLocalStorage<string>('jwt', undefined)
  const { result: user, trigger } = usePromise(whoAmI, true)

  return (
    <userContext.Provider
      value={{
        user,
        jwt,
        setJwt: j => {
          if (j) {
            setJwt(j.token)
          } else {
            localStorage.removeItem('jwt')
          }
          trigger()
        }
      }}
    >
      {children}
    </userContext.Provider>
  )
}
