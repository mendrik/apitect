import clsx from 'clsx'
import { path } from 'ramda'
import { isEmptyString } from 'ramda-adjunct'
import React, { InputHTMLAttributes, useContext } from 'react'
import type { RegisterOptions } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { progressContext } from '../../contexts/withProgress'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import { useId } from '../../hooks/useId'
import { Jsx } from '../../shared/types/generic'
import { ErrorInfo } from './ErrorInfo'
import { formWrappingContext } from './Form'

type OwnProps = {
  label: TFuncKey
  name: string
  options?: RegisterOptions
  containerClassNames?: string
} & InputHTMLAttributes<HTMLInputElement>

export const TextInput = ({
  name,
  label,
  options,
  type = 'text',
  className,
  placeholder,
  containerClassNames,
  autoFocus,
  ...props
}: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors }
  } = useFormContext()
  const { isWorking } = useContext(progressContext)
  const { promise } = useContext(formWrappingContext)

  const inpId = useId()

  useAutoFocus(name, autoFocus)

  return (
    <div className={clsx('form-floating has-validation', containerClassNames)}>
      <input
        type={type}
        className={clsx(
          'form-control ',
          { 'is-invalid': path(name.split('.'), errors) },
          className
        )}
        id={inpId}
        autoComplete="off"
        {...register(name, {
          setValueAs: (u: any) => (isEmptyString(u) ? undefined : u),
          ...options
        })}
        readOnly={props.readOnly || isWorking(promise)}
        required={!!options?.required}
        placeholder={placeholder ?? ' '}
        {...props}
      />
      <label htmlFor={inpId}>{t(label)}</label>
      <ErrorInfo name={name} />
    </div>
  )
}