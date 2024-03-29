import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import { prop } from 'ramda'
import { useForm } from 'react-hook-form'
import { SocketForm } from '~forms/SocketForm'
import { TreeInput } from '~forms/TreeInput'
import { useModal } from '~hooks/useModal'
import {
  ProjectUsersSettings as Settings,
  ZProjectUsersSettings
} from '~shared/types/forms/projectUsersSettings'
import { $treeStore } from '~stores/$treeStore'

import { updateProjectUserSettingsFx } from '../../events/projectUsers'

const ProjectUsersSettings = () => {
  const state = useModal<Settings>()
  const root = useStore($treeStore)

  const form = useForm<Settings>({
    resolver: zodResolver(ZProjectUsersSettings),
    defaultValues: state
  })

  return (
    root && (
      <SocketForm form={form} onValid={updateProjectUserSettingsFx} submitButton="common.save">
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
