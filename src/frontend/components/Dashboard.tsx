import { useStore } from 'effector-react'
import React, { FC, useContext, useEffect } from 'react'

import { socketContext } from '../contexts/socket'
import appState from '../stores/appState'
import { Navigation } from './Navigation'

const Dashboard: FC = () => {
  const { send } = useContext(socketContext)
  const { document } = useStore(appState)

  console.log(document)

  useEffect(() => {
    if (document == null) {
      send({ type: 'DOCUMENT' })
    }
  }, [send, document])

  return (
    <>
      <Navigation />
      <div className="p-4">Dash</div>
    </>
  )
}

export default Dashboard
