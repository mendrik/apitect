import { values } from 'ramda'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { StringValidationType } from '../../../shared/types/forms/nodetypes/stringSettings'
import { FieldSet } from '../../forms/FieldSet'
import { FormOptions } from '../../forms/FormOptions'
import { TextInput } from '../../forms/TextInput'

const String = () => {
  const { t } = useTranslation()
  const { setValue } = useFormContext()
  return (
    <FieldSet title="modals.nodeSettings.validation">
      <FormOptions name="validationType" values={values(StringValidationType)}>
        <label htmlFor={`validationType-${StringValidationType.None}`}>
          {t('modals.nodeSettings.string.none')}
        </label>
        <TextInput
          name="regexp"
          label="modals.nodeSettings.string.regexp"
          type="text"
          onFocus={() => setValue('validationType', StringValidationType.Regexp)}
          options={{ required: false }}
        />
        <label htmlFor={`validationType-${StringValidationType.Email}`}>
          {t('modals.nodeSettings.string.email')}
        </label>
        <label htmlFor={`validationType-${StringValidationType.Password}`}>
          {t('modals.nodeSettings.string.password')}
        </label>
      </FormOptions>
    </FieldSet>
  )
}

export default String
