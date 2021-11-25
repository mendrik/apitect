import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { closeModal, openModal } from '../events/modals'
import { ModalNames } from '../shared/types/modals'
import { addParams, removeParams } from '../shared/utils/url'
import $appStore from '../stores/$appStore'
import { ModalStub } from './ModalStub'

export const Modals = () => {
  const navigate = useNavigate()
  const { selectedNode } = useStore($appStore)

  useEffect(() => {
    const openSub = $appStore.watch(openModal, (_, config) => {
      const to = addParams({ modal: config.name })
      navigate(to, { state: config.params })
    })
    const closeSub = $appStore.watch(closeModal, () => navigate(removeParams(['modal'])))
    return () => {
      openSub()
      closeSub()
    }
  }, [selectedNode])

  return (
    <>
      <ModalStub
        title="modals.authenticate.title"
        from={() => import('./modals/Authenticate')}
        name={ModalNames.LOGIN}
      />
      <ModalStub
        title="modals.forgotPassword.title"
        from={() => import('./modals/ForgotPasswordForm')}
        name={ModalNames.FORGOT_PASSWORD}
      />
      <ModalStub
        title="modals.newNode.title"
        from={() => import('./modals/NewNode')}
        name={ModalNames.NEW_NODE}
      />
      <ModalStub
        title="modals.nodeSettings.title"
        titleOptions={{ property: selectedNode?.value.name ?? '' }}
        from={() => import('./modals/NodeSettings')}
        name={ModalNames.NODE_SETTINGS}
      />
      <ModalStub
        title={`modals.projectUserSettings.title`}
        from={() => import('./modals/ProjectUsersSettings')}
        name={ModalNames.PROJECT_USER_SETTINGS}
      />
    </>
  )
}
