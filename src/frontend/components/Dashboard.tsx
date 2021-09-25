import React, { FC } from 'react'

import { useWhoAmI } from '../hooks/useWhoAmI'
import { Navigation } from './Navigation'

const Dashboard: FC = () => {
  const userState = useWhoAmI()

  return (
    <>
      <Navigation />
      <div>Dashboard {userState.data}</div>
    </>
  )
}

export default Dashboard
