import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import { map } from 'ramda'
import React from 'react'
import { useForm } from 'react-hook-form'

import { useLocation } from '../../hooks/useLocation'
import { Tag, ZTag } from '../../shared/types/domain/tag'
import $appStore from '../../stores/$appStore'
import { ModalFC } from '../ModalStub'
import { Dropdown } from '../forms/Dropdown'
import { SocketForm } from '../forms/SocketForm'
import { TextInput } from '../forms/TextInput'

const TagSettings: ModalFC = ({ close }) => {
  const { state: tag } = useLocation<Tag>()
  const { tags } = useStore($appStore)

  const form = useForm<Tag>({
    resolver: zodResolver(ZTag),
    defaultValues: tag
  })

  return (
    <SocketForm form={form} onValid={Promise.resolve} close={close} submitButton="common.save">
      <TextInput
        name="name"
        label="form.fields.nodeName"
        type="text"
        autoFocus
        containerClassNames="mb-3"
        options={{ required: true }}
      />
      <Dropdown
        label="form.fields.parentTag"
        name="parent"
        options={map(tag => [tag.name, tag.name], tags)}
      />
    </SocketForm>
  )
}

export default TagSettings
