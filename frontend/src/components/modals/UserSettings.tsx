import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import React from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FieldSet } from '~forms/FieldSet'
import { SocketForm } from '~forms/SocketForm'
import { useLocation } from '~hooks/useLocation'
import { UserSettings as Settings, ZUserSettings } from '~shared/types/forms/userSettings'
import { $tagStore } from '~stores/$tagStore'

import { updateUserSettingsFx } from '../../events/user'
import { ModalFC } from '../ModalStub'

const UserSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Settings>()
  const { tags } = useStore($tagStore)
  const form = useForm<Settings>({
    resolver: zodResolver(ZUserSettings),
    defaultValues: state
  })
  return (
    <SocketForm form={form} onValid={updateUserSettingsFx} close={close} submitButton="common.save">
      <FieldSet title="modals.userSettings.visibleTags">
        {tags.map(tag => (
          <Form.Check key={tag.name}>
            <Form.Check.Input
              id={`view-${tag.name}`}
              value={tag.name}
              {...form.register('visibleTags')}
            />
            <Form.Check.Label className={'ms-2 pointer'} role="button" htmlFor={`view-${tag.name}`}>
              {tag.name}
            </Form.Check.Label>
          </Form.Check>
        ))}
      </FieldSet>
    </SocketForm>
  )
}

export default UserSettings
