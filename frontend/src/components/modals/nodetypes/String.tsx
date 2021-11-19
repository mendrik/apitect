import { values } from 'ramda'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { FieldSet } from '../../../forms/FieldSet'
import { FormOptions } from '../../../forms/FormOptions'
import { TextInput } from '../../../forms/TextInput'
import { StringValidationType } from '../../../shared/types/forms/nodetypes/stringSettings'

const String = () => {
  const { t } = useTranslation()
  return (
    <FieldSet title="modals.nodeSettings.validation">
      <FormOptions name="validationType" values={values(StringValidationType)}>
        <div>{t('modals.nodeSettings.string.none')}</div>
        <TextInput
          name="regexp"
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
