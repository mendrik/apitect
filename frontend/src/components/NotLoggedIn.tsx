import React from 'react'

import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'

export const NotLoggedIn = () => {
  return (
    <AppFrame>
      <Navigation />
      <div className="w-50 h-50">Not logged in</div>
    </AppFrame>
  )
}
