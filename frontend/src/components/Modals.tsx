import { useStore } from 'effector-react'
import React, { Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { closeModal, openModal } from '../events/modals'
import { ModalNames } from '../shared/types/modals'
import { addParams, removeParams } from '../shared/utils/url'
import { $selectedNode } from '../stores/$selectedNode'
import { ModalStub } from './ModalStub'
import { Loader } from './generic/Loader'

export const Modals = () => {
  const navigate = useNavigate()
  const selectedNode = useStore($selectedNode)

  useEffect(() => {
    const openSub = openModal.watch(config => {
      const to = addParams({ modal: config.name })
      navigate(to, { state: config.params })
    })
    const closeSub = closeModal.watch(() => navigate(removeParams(['modal'])))
    return () => {
      openSub()
      closeSub()
    }
  }, [selectedNode])

  return (
    <Suspense fallback={<Loader className="d-fixed inset-0 min-vh-100" />}>
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
        onExited={() => {
          const node = document.querySelector<HTMLElement>('#doc-tree .selectedNode')
          setTimeout(() => node?.focus())
        }}
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
      <ModalStub
        title={`modals.tagsSettings.title`}
        from={() => import('./modals/TagsSettings')}
        name={ModalNames.TAGS_SETTINGS}
      />
      <ModalStub
        title={`modals.tagSettings.title`}
        from={() => import('./modals/TagSettings')}
        name={ModalNames.TAG_SETTINGS}
      />
      <ModalStub
        title={`modals.userSettings.title`}
        from={() => import('./modals/UserSettings')}
        name={ModalNames.USER_SETTINGS}
        restoreFocus={false}
      />
    </Suspense>
  )
}
