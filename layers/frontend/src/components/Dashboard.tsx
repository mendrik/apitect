import React, { FC } from 'react'

import { useRequest } from '../hooks/useRequest'
import { Navigation } from './Navigation'

const Dashboard: FC = () => {
  useRequest({ type: 'DOCUMENT' })

  return (
    <>
      <Navigation />
      <div className="p-4">Dash</div>
    </>
  )
}

export default Dashboard
