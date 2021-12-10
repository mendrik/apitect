import { zodResolver } from '@hookform/resolvers/zod'
import { append, prop } from 'ramda'
import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { object, string, TypeOf } from 'zod'
import { SocketForm } from '~forms/SocketForm'
import { TagInput } from '~forms/TagInput'
import { TextInput } from '~forms/TextInput'
import { useLocation } from '~hooks/useLocation'
import { Enums, EnumValue, ZEnums } from '~shared/types/domain/enums'
import { asNumber } from '~shared/utils/ramda'

import { ModalFC } from '../ModalStub'
import { EditableObjectList } from '../generic/EditableObjectList'

export const ZEnumsSettings = object({
  enums: ZEnums,
  selection: string({ invalid_type_error: 'form.validation.mustChoose' })
})

const EnumsSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Enums>()
  const { t } = useTranslation()

  const defaultEnums = append({ name: '', values: [] as any }, state ?? [])

  const form = useForm<TypeOf<typeof ZEnumsSettings>>({
    resolver: zodResolver(ZEnumsSettings),
    defaultValues: { enums: defaultEnums }
  })

  const selection = asNumber(form.watch('selection'))
  const enums = form.watch('enums')

  const deleteButton = (
    <Button
      variant="outline-danger"
      onClick={close}
      disabled={isNaN(selection) || selection == enums.length - 1}
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
        {(field, idx) =>
          selection === idx && (
            <EditableObjectList.Item key={field.id}>
              <TextInput
                name={`enums.${idx}.name`}
                label="modals.enumsSettings.enumName"
                required
              />
              <TagInput<EnumValue>
                name={`enums.${idx}.values`}
                label="modals.enumsSettings.values"
                apply={value => ({ value, inUse: false })}
                unapply={prop('value')}
              />
            </EditableObjectList.Item>
          )
        }
      </EditableObjectList>
    </SocketForm>
  )
}

export default EnumsSettings
