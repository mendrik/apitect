import React, { createContext, FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Maybe } from '../../utils/maybe'
import { State } from '../hooks/usePromise'
import { useWhoAmI } from '../hooks/useWhoAmI'
import { User } from '../types/user'
import Dashboard from './Dashboard'
import { ErrorView } from './ErrorView'
import { NotLoggedIn } from './NotLoggedIn'

type UserContext = Omit<State<Maybe<User>>, 'trigger'>
const userContext = createContext<UserContext>({ name: 'whoAmI', status: 'idle' })

const App: FC = () => {
  const userState = useWhoAmI()

  return userState.data ? (
    <userContext.Provider value={userState}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </userContext.Provider>
  ) : (
    <Routes>
      <Route path="/" element={<NotLoggedIn />} />
      <Route path="/error" element={<ErrorView />} />
    </Routes>
  )
}

export default App
