import React, { createContext, FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { State } from '../hooks/usePromise'
import { useWhoAmI } from '../hooks/useWhoAmI'
import { User } from '../types/user'
import Dashboard from './Dashboard'
import { NotLoggedIn } from './NotLoggedIn'

type UserContext = Omit<State<User>, 'trigger'>
const userContext = createContext<UserContext>({ status: 'idle' })

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
    </Routes>
  )
}

export default App
