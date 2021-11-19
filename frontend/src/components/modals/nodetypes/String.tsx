import React from 'react'
import { useTranslation } from 'react-i18next'

import { FieldSet } from '../../../forms/FieldSet'
import { FormOptions } from '../../../forms/FormOptions'
import { TextInput } from '../../../forms/TextInput'

const String = () => {
  const { t } = useTranslation()
  return (
    <FieldSet title="modals.nodeSettings.validation">
      <FormOptions name="type">
        <TextInput
          name="validation.regexp"
          label="modals.nodeSettings.string.regexp"
          type="text"
          options={{ required: false }}
        />
        <div>{t('modals.nodeSettings.string.email')}</div>
      </FormOptions>
    </FieldSet>
  )
}

export default String
