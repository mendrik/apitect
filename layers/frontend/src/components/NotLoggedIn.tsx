import React, { FC } from 'react'

import { Navigation } from './Navigation'

export const NotLoggedIn: FC = () => {
  return (
    <>
      <Navigation />
      <div className="w-50 h-50">Not logged in</div>
    </>
  )
}
