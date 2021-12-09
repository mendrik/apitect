import { zodResolver } from '@hookform/resolvers/zod'
import { append } from 'ramda'
import React from 'react'
import { Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SocketForm } from '~forms/SocketForm'
import { TagInput } from '~forms/TagInput'
import { TextInput } from '~forms/TextInput'
import { useLocation } from '~hooks/useLocation'
import { Enums, ZEnums } from '~shared/types/domain/enums'

import { ModalFC } from '../ModalStub'
import { EditableObjectList } from '../generic/EditableObjectList'

const EnumsSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Enums>()
  const { t } = useTranslation()

  const enums = append({ name: t('modals.enumsSettings.newEnum'), values: [] }, state ?? [])

  const form = useForm<{ enums: Enums }>({
    resolver: zodResolver(ZEnums),
    defaultValues: { enums }
  })

  return (
    <SocketForm form={form} onValid={async () => 0} close={close} submitButton="common.save">
      <Alert variant="info" className="mb-3">
        {t('modals.enumsSettings.info')}
      </Alert>
      <EditableObjectList
        form={form}
        name="enums"
        title={(f, idx) => <span>{enums[idx].name}</span>}
      >
        {(field, idx) => (
          <div className="d-grid gap-2" key={field.id}>
            <TextInput name={`enums.${idx}.name`} label="modals.enumsSettings.enumName" />
            <TagInput name={`enums.${idx}.values`} label="modals.enumsSettings.values" />
          </div>
        )}
      </EditableObjectList>
    </SocketForm>
  )
}

export default EnumsSettings
