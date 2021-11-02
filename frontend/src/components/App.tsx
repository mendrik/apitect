import React, { FC, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { WithSocket } from '../contexts/socket'
import { userContext } from '../contexts/user'
import Dashboard from './Dashboard'
import { NotLoggedIn } from './NotLoggedIn'
import { ErrorView } from './generic/ErrorView'
import { WaitForDocument } from './specific/WaitForDocument'

const App: FC = () => {
  const userState = useContext(userContext)
  if (userState.status === 'running' || document == null) {
    return null
  }
  return userState.user ? (
    <WithSocket>
      <WaitForDocument>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </WaitForDocument>
    </WithSocket>
  ) : (
    <Routes>
      <Route path="/" element={<NotLoggedIn />} />
      <Route path="/error" element={<ErrorView />} />
    </Routes>
  )
}

export default App
