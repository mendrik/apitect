import clsx from 'clsx'
import { mapIndexed } from 'ramda-adjunct'
import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { FormSelectProps } from 'react-bootstrap/FormSelect'
import { Controller } from 'react-hook-form'
import { ControllerProps } from 'react-hook-form/dist/types'
import { TFuncKey, useTranslation } from 'react-i18next'
import { useId } from '~hooks/useId'
import { Jsx } from '~shared/types/generic'

import { ErrorInfo } from './ErrorInfo'

type OwnProps = {
  label: TFuncKey
  options: Array<[string, string]>
  name: string
  controllerProps?: ControllerProps
  containerClassNames?: string
} & FormSelectProps

export const Dropdown = ({
  name,
  label,
  className,
  placeholder,
  containerClassNames,
  controllerProps,
  required,
  autoFocus,
  options,
  ...props
}: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const inpId = useId()

  return (
    <div className={clsx('form-floating has-validation', containerClassNames)}>
      <Controller
        {...controllerProps}
        name={name}
        render={({ field }) => (
          <FloatingLabel controlId={inpId} label={t(label)}>
            <Form.Select aria-label={t(label) as string} {...field} {...props}>
              {!required && <option>{t('form.dropDown.noValue')}</option>}
              {mapIndexed(
                ([key, value]) => (
                  <option value={value} key={value}>
                    {t(key as TFuncKey, key)}
                  </option>
                ),
                options
              )}
            </Form.Select>
          </FloatingLabel>
        )}
      />
      <ErrorInfo name={name} />
    </div>
  )
}
