import clsx from 'clsx'
import { path } from 'ramda'
import { isEmptyString } from 'ramda-adjunct'
import React, { InputHTMLAttributes } from 'react'
import type { RegisterOptions } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import { useAutoFocus } from '~hooks/useAutoFocus'
import { useId } from '~hooks/useId'
import { Jsx } from '~shared/types/generic'

import { ErrorInfo } from './ErrorInfo'

type OwnProps = {
  label: TFuncKey
  name: string
  options?: RegisterOptions
  containerClassNames?: string
} & InputHTMLAttributes<HTMLSelectElement>

export const SelectInput = ({
  name,
  label,
  options,
  className,
  placeholder,
  containerClassNames,
  autoFocus,
  children,
  ...props
}: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const inpId = useId()

  useAutoFocus(name, autoFocus)

  return (
    <div className={clsx('form-floating has-validation', containerClassNames)}>
      <select
        className={clsx(
          'form-control ',
          { 'is-invalid': path(name.split('.'), errors) },
          className
        )}
        id={inpId}
        autoComplete="off"
        {...register(name, {
          setValueAs: <T extends any>(u: T) => (isEmptyString(u) ? undefined : u),
          ...options
        })}
        required={!!options?.required}
        placeholder={placeholder ?? ' '}
        {...props}
      >
        {children}
      </select>
      <label htmlFor={inpId}>{t(label)}</label>
      <ErrorInfo name={name} />
    </div>
  )
}
