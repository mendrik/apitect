import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import { prop } from 'ramda'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { updateProjectUserSettingsFx } from '../../events/project'
import { SocketForm } from '../../forms/SocketForm'
import { TreeInput } from '../../forms/TreeInput'
import { TreeNode } from '../../shared/algebraic/treeNode'
import { Node } from '../../shared/types/domain/node'
import {
  ProjectUsersSettings as Settings,
  ZProjectUsersSettings
} from '../../shared/types/forms/projectUsersSettings'
import $appStore from '../../stores/$appStore'
import { ModalFC } from '../ModalStub'

const ProjectUsersSettings: ModalFC = ({ close }) => {
  const form = useForm<Settings>({
    resolver: zodResolver(ZProjectUsersSettings),
    defaultValues: {}
  })

  const { tree } = useStore($appStore)
  const root = useMemo(() => TreeNode.from<Node, 'children'>('children')(tree), [tree])

  return (
    <SocketForm
      form={form}
      onValid={updateProjectUserSettingsFx}
      close={close}
      submitButton="common.save"
    >
      <TreeInput
        name="emailId"
        label="form.fields.emailField"
        tree={root}
        onSelect={node => console.log(node)}
        containerClasses="mb-3"
        nodeRender={prop('name')}
      />
      <TreeInput
        name="passwordId"
        label="form.fields.passwordField"
        tree={root}
        onSelect={node => console.log(node)}
        containerClasses="mb-3"
        nodeRender={prop('name')}
      />
    </SocketForm>
  )
}

export default ProjectUsersSettings
