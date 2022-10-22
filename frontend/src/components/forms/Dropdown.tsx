import clsx from 'clsx'
import type { TFuncKey } from 'i18next'
import { mapIndexed } from 'ramda-adjunct'
import { ReactNode } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { FormSelectProps } from 'react-bootstrap/FormSelect'
import { Controller } from 'react-hook-form'
import { ControllerProps } from 'react-hook-form/dist/types'
import { useTranslation } from 'react-i18next'
import { useId } from '~hooks/useId'

import { LocaleKey } from '../../type-patches/locales'
import { ErrorInfo } from './ErrorInfo'

type OwnProps = {
  label: LocaleKey
  options: Array<[string, string]>
  name: string
  controllerProps?: ControllerProps
  containerClassNames?: string
} & FormSelectProps

export const Dropdown = ({
  name,
  label,
  containerClassNames,
  controllerProps,
  required,
  options,
  ...props
}: OwnProps) => {
  const { t } = useTranslation()
  const inpId = useId()

  return (
    <div className={clsx('form-floating has-validation', containerClassNames)}>
      <Controller
        {...controllerProps}
        name={name}
        render={({ field }) => (
          <FloatingLabel controlId={inpId} label={t(label) as ReactNode}>
            <Form.Select aria-label={t(label) as string} {...field} {...props}>
              {!required && <option value="">{t('form.dropDown.noValue')}</option>}
              {mapIndexed(
                ([key, value]) => (
                  <option value={value} key={value}>
                    {t(key as TFuncKey, key) as string}
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
