import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import { prop } from 'ramda'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  ProjectUsersSettings as Settings,
  ZProjectUsersSettings
} from '~shared/types/forms/projectUsersSettings'

import { updateProjectUserSettingsFx } from '../../events/project'
import { useLocation } from '../../hooks/useLocation'
import { $treeStore } from '../../stores/$treeStore'
import { ModalFC } from '../ModalStub'
import { SocketForm } from '../forms/SocketForm'
import { TreeInput } from '../forms/TreeInput'

const ProjectUsersSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Settings>()
  const root = useStore($treeStore)

  const form = useForm<Settings>({
    resolver: zodResolver(ZProjectUsersSettings),
    defaultValues: state
  })

  return (
    root && (
      <SocketForm
        form={form}
        onValid={updateProjectUserSettingsFx}
        close={close}
        submitButton="common.save"
      >
        <TreeInput
          label="form.fields.emailId"
          tree={root}
          name="emailId"
          containerClasses="mb-3"
          nodeRender={prop('name')}
        />
        <TreeInput
          label="form.fields.passwordId"
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
