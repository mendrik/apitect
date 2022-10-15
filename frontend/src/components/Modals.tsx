import { useStore } from 'effector-react'
import { Suspense } from 'react'
import { ModalNames } from '~shared/types/modals'
import { $currentNode } from '~stores/$selectedNode'

import { ModalStub } from './ModalStub'
import { Loader } from './generic/Loader'
import Authenticate from './modals/Authenticate'
import EnumsSettings from './modals/EnumsSettings'
import ForgotPasswordForm from './modals/ForgotPasswordForm'
import NewNode from './modals/NewNode'
import NodeSettings from './modals/NodeSettings'
import ProjectUsersSettings from './modals/ProjectUsersSettings'
import TagSettings from './modals/TagSettings'
import TagsSettings from './modals/TagsSettings'
import UserSettings from './modals/UserSettings'

export const Modals = () => {
  const node = useStore($currentNode)

  return (
    <Suspense fallback={<Loader className="d-fixed inset-0 min-vh-100" />}>
      <ModalStub title="modals.authenticate.title" content={Authenticate} name={ModalNames.LOGIN} />
      <ModalStub
        title="modals.forgotPassword.title"
        content={ForgotPasswordForm}
        name={ModalNames.FORGOT_PASSWORD}
      />
      <ModalStub title="modals.newNode.title" content={NewNode} name={ModalNames.NEW_NODE} />
      <ModalStub
        title="modals.nodeSettings.title"
        titleOptions={{ property: node?.value.name ?? '' }}
        content={NodeSettings}
        name={ModalNames.NODE_SETTINGS}
      />
      <ModalStub
        title={`modals.projectUserSettings.title`}
        content={ProjectUsersSettings}
        name={ModalNames.PROJECT_USER_SETTINGS}
      />
      <ModalStub
        title={`modals.tagsSettings.title`}
        content={TagsSettings}
        name={ModalNames.TAGS_SETTINGS}
      />
      <ModalStub
        title={`modals.tagSettings.title`}
        content={TagSettings}
        name={ModalNames.TAG_SETTINGS}
      />
      <ModalStub
        title={`modals.enumsSettings.title`}
        content={EnumsSettings}
        name={ModalNames.ENUMS_SETTINGS}
      />
      <ModalStub
        title={`modals.userSettings.title`}
        content={UserSettings}
        name={ModalNames.USER_SETTINGS}
      />
    </Suspense>
  )
}
