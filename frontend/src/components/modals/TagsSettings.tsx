import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DateInput } from '~forms/DateInput'
import { SocketForm } from '~forms/SocketForm'
import { TagInput } from '~forms/TagInput'
import { useLocation } from '~hooks/useLocation'
import { TagsSettings as Settings, ZTagsSettings } from '~shared/types/forms/tagsSettings'
import { field, toObj } from '~shared/utils/ramda'

import { updateTagsSettingsFx } from '../../events/project'
import { ModalFC } from '../ModalStub'

const TagsSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Settings>()
  const { t } = useTranslation()

  const form = useForm<Settings>({
    resolver: zodResolver(ZTagsSettings),
    defaultValues: state
  })

  return (
    <SocketForm form={form} onValid={updateTagsSettingsFx} close={close} submitButton="common.save">
      <Alert variant="info" className="mb-3">
        {t('modals.tagsSettings.info')}
      </Alert>
      <TagInput
        label="form.fields.tags"
        name="tags"
        containerClasses="mb-3"
        apply={toObj('name')}
        unapply={field('name')}
      />
      <DateInput label="form.fields.tags" name="date" />
    </SocketForm>
  )
}

export default TagsSettings
