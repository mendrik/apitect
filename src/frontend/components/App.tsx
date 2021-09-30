import React, { FC, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { WithSocket } from '../contexts/socket'
import { userContext } from '../contexts/user'
import Dashboard from './Dashboard'
import { ErrorView } from './ErrorView'
import { NotLoggedIn } from './NotLoggedIn'

const App: FC = () => {
  const userState = useContext(userContext)
  return userState.user ? (
    <WithSocket>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </WithSocket>
  ) : (
    <Routes>
      <Route path="/" element={<NotLoggedIn />} />
      <Route path="/error" element={<ErrorView />} />
    </Routes>
  )
}

export default App
