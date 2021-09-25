import React, { FC } from 'react'

import { LazyModal } from './LazyModal'

export const Modals: FC = () => {
  return (
    <div className="modal">
      <LazyModal
        title="modals.authenticate.login.title"
        from={() => import('./modals/Authenticate')}
        name="login"
      />
    </div>
  )
}
