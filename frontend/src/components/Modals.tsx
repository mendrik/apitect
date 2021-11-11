import { useStore } from 'effector-react'
import React, { FC, useEffect } from 'react'
import { TFuncKey } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { openModal } from '../events/modals'
import { addParams } from '../shared/utils/url'
import $appStore from '../stores/$appStore'
import { LazyModal } from './LazyModal'

export const Modals: FC = () => {
  const navigate = useNavigate()
  const { selectedNode } = useStore($appStore)

  useEffect(() => $appStore.watch(openModal, (_state, modal) => navigate(addParams({ modal }))))

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
      {selectedNode && (
        <LazyModal
          title={`modals.nodeSettings.${selectedNode.nodeType.toLowerCase()}.title` as TFuncKey}
          from={() => import('./modals/NodeSettings')}
          name="node-settings"
        />
      )}
    </div>
  )
}
