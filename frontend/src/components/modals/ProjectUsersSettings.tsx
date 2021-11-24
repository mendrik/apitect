import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { updateProjectUserSettingsFx } from '../../events/project'
import { SocketForm } from '../../forms/SocketForm'
import {
  ProjectUsersSettings as Settings,
  ZProjectUsersSettings
} from '../../shared/types/forms/projectUsersSettings'
import { ModalFC } from '../ModalStub'

const ProjectUsersSettings: ModalFC = ({ close }) => {
  const form = useForm<Settings>({
    resolver: zodResolver(ZProjectUsersSettings),
    defaultValues: {}
  })

  return (
    <SocketForm
      form={form}
      onValid={updateProjectUserSettingsFx}
      close={close}
      submitButton="common.save"
    >
      a
    </SocketForm>
  )
}

export default ProjectUsersSettings
