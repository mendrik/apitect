import { zodResolver } from '@hookform/resolvers/zod'
import { append, prop } from 'ramda'
import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SocketForm } from '~forms/SocketForm'
import { TagInput } from '~forms/TagInput'
import { TextInput } from '~forms/TextInput'
import { useLocation } from '~hooks/useLocation'
import { Enum, Enums, ZEnums } from '~shared/types/domain/enums'

import { ModalFC } from '../ModalStub'
import { EditableObjectList } from '../generic/EditableObjectList'

const EnumsSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Enums>()
  const { t } = useTranslation()

  const defaultEnums = append({ name: '', values: [] }, state ?? [])

  const form = useForm<{ enums: Enums; selection: string }>({
    resolver: zodResolver(ZEnums),
    defaultValues: { enums: defaultEnums }
  })

  const selection = parseInt(form.watch('selection'), 10)
  const enums = form.watch('enums')

  const deleteButton = (
    <Button
      variant="outline-danger"
      onClick={close}
      disabled={!selection || selection == enums.length - 1}
    >
      {t('common.delete')}
    </Button>
  )

  return (
    <SocketForm
      form={form}
      onValid={async () => 0}
      close={close}
      submitButton="common.save"
      buttonRowExtras={deleteButton}
    >
      <Alert variant="info" className="mb-3">
        {t('modals.enumsSettings.info')}
      </Alert>
      <EditableObjectList
        form={form}
        selectedName="selection"
        name="enums"
        title={(f, idx) => <span>{enums[idx].name || t('modals.enumsSettings.newEnum')}</span>}
      >
        {(field, idx) => (
          <div className="d-grid gap-2" key={field.id}>
            <TextInput name={`enums.${idx}.name`} label="modals.enumsSettings.enumName" required />
            <TagInput<Enum>
              name={`enums.${idx}.values`}
              label="modals.enumsSettings.values"
              apply={name => ({ name, values: [] })}
              unapply={prop('name')}
            />
          </div>
        )}
      </EditableObjectList>
    </SocketForm>
  )
}

export default EnumsSettings
