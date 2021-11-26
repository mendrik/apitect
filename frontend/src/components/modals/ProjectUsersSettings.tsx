import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import { prop } from 'ramda'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { updateProjectUserSettingsFx } from '../../events/project'
import { useLocation } from '../../hooks/useLocation'
import { TreeNode } from '../../shared/algebraic/treeNode'
import { Node } from '../../shared/types/domain/node'
import {
  ProjectUsersSettings as Settings,
  ZProjectUsersSettings
} from '../../shared/types/forms/projectUsersSettings'
import $appStore from '../../stores/$appStore'
import { ModalFC } from '../ModalStub'
import { SocketForm } from '../forms/SocketForm'
import { TreeInput } from '../forms/TreeInput'

const ProjectUsersSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Settings>()

  const form = useForm<Settings>({
    resolver: zodResolver(ZProjectUsersSettings),
    defaultValues: state
  })

  const { tree } = useStore($appStore)
  const root = useMemo(() => TreeNode.from<Node, 'children'>('children')(tree), [tree])

  return (
    tree && (
      <SocketForm
        form={form}
        onValid={updateProjectUserSettingsFx}
        close={close}
        submitButton="common.save"
      >
        <TreeInput
          label="form.fields.emailField"
          tree={root}
          name="emailId"
          containerClasses="mb-3"
          nodeRender={prop('name')}
        />
        <TreeInput
          label="form.fields.passwordField"
          tree={root}
          name="passwordId"
          containerClasses="mb-3"
          nodeRender={prop('name')}
        />
      </SocketForm>
    )
  )
}

export default ProjectUsersSettings
