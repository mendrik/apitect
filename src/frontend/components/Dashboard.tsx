import React, { FC } from 'react'

import { safeParse } from '../../shared/utils/ramda'
import { useSend } from '../hooks/useSend'
import { Navigation } from './Navigation'

const Dashboard: FC = () => {
  useSend({ type: 'AUTHORIZE', jwt: safeParse(localStorage.getItem('jwt'))! })
  return (
    <>
      <Navigation />
      <div className="p-4">Dash</div>
    </>
  )
}

export default Dashboard
