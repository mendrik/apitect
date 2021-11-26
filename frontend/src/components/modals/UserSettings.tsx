import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import React from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { updateUserSettingsFx } from '../../events/user'
import { useLocation } from '../../hooks/useLocation'
import { UserSettings as Settings, ZUserSettings } from '../../shared/types/forms/userSettings'
import $appStore from '../../stores/$appStore'
import { ModalFC } from '../ModalStub'
import { SocketForm } from '../forms/SocketForm'

const UserSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Settings>()
  const { tags } = useStore($appStore)

  const form = useForm<Settings>({
    resolver: zodResolver(ZUserSettings),
    defaultValues: state
  })

  return (
    <SocketForm form={form} onValid={updateUserSettingsFx} close={close} submitButton="common.save">
      {tags.map(tag => (
        <Form.Check type="checkbox" label={`${tag.name}`} />
      ))}
    </SocketForm>
  )
}

export default UserSettings
