import React, { createContext } from 'react'
import { useLocalStorage } from 'react-use'
import { User } from 'shared/types/domain/user'
import { Jsx, Maybe } from 'shared/types/generic'

import useProgress from '../hooks/useProgress'
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
  const [withProgress, res] = useProgress<User | null>()
  const { trigger } = usePromise(() => withProgress(whoAmI()), true)

  return res.status === 'done' ? (
    <userContext.Provider
      value={{
        user: res.result,
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
  ) : null
}
