import { useStore } from 'effector-react'
import { Suspense } from 'react'
import { ModalNames } from '~shared/types/modals'
import { $currentNode } from '~stores/$selectedNode'

import { ModalStub } from './ModalStub'
import { Loader } from './generic/Loader'

export const Modals = () => {
  const node = useStore($currentNode)

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
      />
      <ModalStub
        title="modals.nodeSettings.title"
        titleOptions={{ property: node?.value.name ?? '' }}
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
        title={`modals.enumsSettings.title`}
        from={() => import('./modals/EnumsSettings')}
        name={ModalNames.ENUMS_SETTINGS}
      />
      <ModalStub
        title={`modals.userSettings.title`}
        from={() => import('./modals/UserSettings')}
        name={ModalNames.USER_SETTINGS}
      />
    </Suspense>
  )
}
