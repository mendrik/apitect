import { useStore } from 'effector-react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { WithSocket } from '../contexts/withSocket'
import { $user } from '../stores/$userStore'
import Dashboard from './Dashboard'
import { NotLoggedIn } from './NotLoggedIn'
import { ErrorView } from './generic/ErrorView'

const App = () => {
  const user = useStore($user)
  return user ? (
    <WithSocket>
      <Routes>
        <Route path="/error" element={<ErrorView />} />
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
