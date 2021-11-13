import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { closeModal, openModal } from '../events/modals'
import { addParams, removeParams } from '../shared/utils/url'
import $appStore from '../stores/$appStore'
import { ModalStub } from './ModalStub'

export const Modals = () => {
  const navigate = useNavigate()
  const { selectedNode } = useStore($appStore)

  useEffect(() => {
    const openSub = $appStore.watch(openModal, (_, config) => {
      navigate(addParams({ modal: config.name }), { state: config.params })
    })
    const closeSub = $appStore.watch(closeModal, () => navigate(removeParams(['modal'])))
    return () => {
      openSub()
      closeSub()
    }
  }, [selectedNode])

  return (
    <div className="modal">
      <ModalStub
        title="modals.authenticate.title"
        from={() => import('./modals/Authenticate')}
        name="login"
      />
      <ModalStub
        title="modals.forgotPassword.title"
        from={() => import('./modals/ForgotPasswordForm')}
        name="forgot-password"
      />
      <ModalStub
        title="modals.newNode.title"
        from={() => import('./modals/NewNode')}
        name="new-node"
      />
      {selectedNode && (
        <ModalStub
          title={`modals.nodeSettings.title`}
          titleOptions={{ property: selectedNode.value.name }}
          from={() => import('./modals/NodeSettings')}
          name="node-settings"
        />
      )}
    </div>
  )
}
