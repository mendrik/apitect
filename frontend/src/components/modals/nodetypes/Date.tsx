import { values } from 'ramda'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '~forms/Checkbox'
import { FieldSet } from '~forms/FieldSet'
import { FormOptions } from '~forms/FormOptions'
import { TextInput } from '~forms/TextInput'
import { DateDisplay } from '~shared/types/forms/nodetypes/dateSettings'

const Date = () => {
  const { t } = useTranslation()
  const { setValue } = useFormContext()
  return (
    <FieldSet title="modals.nodeSettings.appearance">
      <FormOptions name="display" values={values(DateDisplay)} className="mb-3">
        <label htmlFor={`display-${DateDisplay.Localized}`}>
          {t('modals.nodeSettings.date.localized')}
        </label>
        <TextInput
          name="format"
          label="modals.nodeSettings.date.custom"
          onFocus={() => setValue('display', DateDisplay.Custom)}
          options={{ required: false }}
        />
        <label htmlFor={`display-${DateDisplay.HumanReadable}`}>
          {t('modals.nodeSettings.date.humanReadable')}
        </label>
      </FormOptions>
      <Checkbox name="required" label={'modals.nodeSettings.required'} className={'mb-3'} />
    </FieldSet>
  )
}

export default Date
