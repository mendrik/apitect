import React, { createContext, FC } from 'react'

import { Maybe } from '../../utils/maybe'
import { State } from '../hooks/usePromise'
import { useWhoAmI } from '../hooks/useWhoAmI'
import { User } from '../types/user'

export type UserContext = State<Maybe<User>>

export const userContext = createContext<UserContext>({
  name: 'whoAmI',
  status: 'idle',
  trigger: async () => null
})

export const WithUser: FC = ({ children }) => {
  const userState = useWhoAmI()
  return <userContext.Provider value={userState}>{children}</userContext.Provider>
}
