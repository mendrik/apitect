import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { openModal } from '../events/modals'
import { addParams } from '../shared/utils/url'
import appStore from '../stores/appStore'
import { LazyModal } from './LazyModal'

export const Modals: FC = () => {
  const navigate = useNavigate()

  useEffect(() => appStore.watch(openModal, (_state, modal) => navigate(addParams({ modal }))))

  return (
    <div className="modal">
      <LazyModal
        title="modals.authenticate.title"
        from={() => import('./modals/Authenticate')}
        name="login"
      />
      <LazyModal
        title="modals.forgotPassword.title"
        from={() => import('./modals/ForgotPasswordForm')}
        name="forgot-password"
      />
      <LazyModal
        title="modals.newNode.title"
        from={() => import('./modals/NewNode')}
        name="new-node"
      />
    </div>
  )
}
