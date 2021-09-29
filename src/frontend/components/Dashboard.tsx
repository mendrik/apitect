import React, { FC } from 'react'

import { useSend } from '../hooks/useSend'
import { Navigation } from './Navigation'

const Dashboard: FC = () => {
  useSend({ type: 'PROJECT' })
  return (
    <>
      <Navigation />
      <div className="p-4">Dash</div>
    </>
  )
}

export default Dashboard
