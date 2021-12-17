import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { SocketForm } from '~forms/SocketForm'
import { TreeInput } from '~forms/TreeInput'
import { useLocation } from '~hooks/useLocation'
import {
  ProjectUsersSettings as Settings,
  ZProjectUsersSettings
} from '~shared/types/forms/projectUsersSettings'
import { field } from '~shared/utils/ramda'
import { $treeStore } from '~stores/$treeStore'

import { updateProjectUserSettingsFx } from '../../events/project'
import { ModalFC } from '../ModalStub'

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
          nodeRender={field('name')}
        />
        <TreeInput
          label="form.fields.passwordId"
          tree={root}
          name="passwordId"
          containerClasses="mb-3"
          nodeRender={field('name')}
        />
      </SocketForm>
    )
  )
}

export default ProjectUsersSettings
