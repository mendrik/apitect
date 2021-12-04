import { zodResolver } from '@hookform/resolvers/zod'
import { append, without } from 'ramda'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Tag } from '~shared/types/domain/tag'
import { TagsSettings as Settings, ZTagsSettings } from '~shared/types/forms/tagsSettings'

import { updateTagsSettingsFx } from '../../events/project'
import { useLocation } from '../../hooks/useLocation'
import { ModalFC } from '../ModalStub'
import { SocketForm } from '../forms/SocketForm'
import { TagInput } from '../forms/TagInput'

const TagsSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Settings>()
  const { t } = useTranslation()
  const [tags, setTags] = useState<Tag[]>(state?.tags ?? [])

  const form = useForm<Settings>({
    resolver: zodResolver(ZTagsSettings),
    defaultValues: state
  })

  useEffect(() => form.setValue('tags', tags), [tags])

  return (
    <SocketForm form={form} onValid={updateTagsSettingsFx} close={close} submitButton="common.save">
      <Alert variant="info" className="mb-3">
        {t('modals.tagsSettings.info')}
      </Alert>
      <TagInput
        label="form.fields.tags"
        name="tags"
        containerClasses="mb-3"
        tags={tags}
        onAdd={name => setTags(append({ name }))}
        onRemove={tag => setTags(without([tag]))}
      />
    </SocketForm>
  )
}

export default TagsSettings
