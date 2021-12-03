import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from 'effector-react'
import { always, fromPairs, juxt, map, prop, propEq } from 'ramda'
import React from 'react'
import { useForm } from 'react-hook-form'

import { updateTagsSettingsFx } from '../../events/project'
import { useLocation } from '../../hooks/useLocation'
import { Tag, ZTag } from '../../shared/types/domain/tag'
import { isCyclic, updateArrayBy } from '../../shared/utils/ramda'
import { $tagStore } from '../../stores/$tagStore'
import { ModalFC } from '../ModalStub'
import { Dropdown } from '../forms/Dropdown'
import { SocketForm } from '../forms/SocketForm'
import { TextInput } from '../forms/TextInput'

const TagSettings: ModalFC = ({ close }) => {
  const { state: tag } = useLocation<Tag>()
  const { tags } = useStore($tagStore)

  const form = useForm<Tag>({
    resolver: zodResolver(ZTag),
    defaultValues: tag
  })

  const extendableTags = tags.filter(t => {
    const mockTags = updateArrayBy(propEq('name', tag), always({ ...tag, parent: t.name }), tags)
    const pathMap = fromPairs(map(juxt<any[], any, any>([prop('name'), prop('parent')]), mockTags))
    return !isCyclic(pathMap)(t.name)
  })

  return (
    <SocketForm
      form={form}
      onValid={async data =>
        updateTagsSettingsFx({ tags: updateArrayBy(propEq('name', tag.name), always(data), tags) })
      }
      close={close}
      submitButton="common.save"
    >
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
        options={map(tag => [tag.name, tag.name], extendableTags)}
      />
    </SocketForm>
  )
}

export default TagSettings
