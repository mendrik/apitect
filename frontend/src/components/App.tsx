import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { WithSocket } from '../contexts/withSocket'
import { userContext } from '../contexts/withUser'
import Dashboard from './Dashboard'
import { NotLoggedIn } from './NotLoggedIn'
import { ErrorView } from './generic/ErrorView'
import { WaitForDocument } from './specific/WaitForDocument'

const App = () => {
  const { user } = useContext(userContext)
  return user ? (
    <WithSocket>
      <WaitForDocument>
        <Routes>
          <Route path="/error" element={<ErrorView />} />
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
