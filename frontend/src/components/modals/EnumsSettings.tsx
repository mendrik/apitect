import { zodResolver } from '@hookform/resolvers/zod'
import { append, prop } from 'ramda'
import React, { useRef } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { array, object, string, TypeOf } from 'zod'
import { SocketForm } from '~forms/SocketForm'
import { TagInput } from '~forms/TagInput'
import { TextInput } from '~forms/TextInput'
import { useLocation } from '~hooks/useLocation'
import { lastItemOptional } from '~shared/codecs/lastItemOptional'
import { Enums, EnumValue, ZEnum } from '~shared/types/domain/enums'
import { asNumber } from '~shared/utils/ramda'

import { updateEnumsFx } from '../../events/project'
import { ModalFC } from '../ModalStub'
import { EditableObjectList } from '../generic/EditableObjectList'

export const ZEnumsSettings = lastItemOptional(
  object({
    enums: array(ZEnum),
    selection: string().nullish()
  })
)
type EnumsSettings = TypeOf<typeof ZEnumsSettings>

const EnumsSettings: ModalFC = ({ close }) => {
  const { state } = useLocation<Enums>()
  const { t } = useTranslation()
  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  const defaultEnums = append({ name: '', values: new Array<EnumValue>() }, state?.enums ?? [])

  const form = useForm<EnumsSettings>({
    resolver: zodResolver(ZEnumsSettings),
    defaultValues: { enums: defaultEnums, selection: undefined }
  })

  const selection = asNumber(form.watch('selection'))
  const enums = form.watch('enums')

  const deleteButton = (
    <Button
      ref={deleteButtonRef}
      variant="outline-danger"
      disabled={isNaN(selection) || selection == enums.length - 1}
    >
      {t('common.delete')}
    </Button>
  )

  return (
    <SocketForm
      form={form}
      onValid={updateEnumsFx}
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
        deleteButtonRef={deleteButtonRef}
        title={(f, idx) => (
          <span>
            {idx < enums.length - 1
              ? enums[idx].name ?? t('modals.enumsSettings.missingName')
              : t('modals.enumsSettings.newEnum')}
          </span>
        )}
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
