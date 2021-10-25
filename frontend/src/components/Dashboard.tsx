import React, { FC } from 'react'

import { useRequest } from '../hooks/useRequest'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'

const Dashboard: FC = () => {
  useRequest({ type: 'DOCUMENT' })

  return (
    <AppFrame>
      <Navigation />
      <div className="p-4">Dash</div>
    </AppFrame>
  )
}

export default Dashboard
