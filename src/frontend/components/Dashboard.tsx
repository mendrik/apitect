import React, { FC, useContext, useEffect } from 'react'

import { socketContext } from '../contexts/socket'
import { Navigation } from './Navigation'

const Dashboard: FC = () => {
  const { send } = useContext(socketContext)

  useEffect(() => {
    send({ type: 'PROJECT' })
  })

  return (
    <>
      <Navigation />
      <div className="p-4">Dash</div>
    </>
  )
}

export default Dashboard
