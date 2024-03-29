import { zodResolver } from '@hookform/resolvers/zod'
import { objOf, propOr } from 'ramda'
import { Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SocketForm } from '~forms/SocketForm'
import { TagInput } from '~forms/TagInput'
import { useModal } from '~hooks/useModal'
import { TagsSettings as Settings, ZTagsSettings } from '~shared/types/forms/tagsSettings'

import { updateTagsSettingsFx } from '../../events/tagSettings'

const TagsSettings = () => {
  const state = useModal<Settings>()
  const { t } = useTranslation()

  const form = useForm<Settings>({
    resolver: zodResolver(ZTagsSettings),
    defaultValues: state
  })

  return (
    <SocketForm form={form} onValid={updateTagsSettingsFx} submitButton="common.save">
      <Alert variant="info" className="mb-3">
        {t('modals.tagsSettings.info')}
      </Alert>
      <TagInput
        label="form.fields.tags"
        name="tags"
        containerClasses="mb-3"
        apply={objOf('name')}
        unapply={propOr('', 'name')}
      />
    </SocketForm>
  )
}

export default TagsSettings
