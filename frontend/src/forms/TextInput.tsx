import clsx from 'clsx'
import { path } from 'ramda'
import React, { InputHTMLAttributes, useContext, useEffect } from 'react'
import type { RegisterOptions } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { progressContext } from '../contexts/progress'
import { useId } from '../hooks/useId'
import { Jsx } from '../shared/types/generic'
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
    watch,
    register,
    setFocus,
    formState: { errors }
  } = useFormContext()
  const { isWorking } = useContext(progressContext)
  const { promise } = useContext(formWrappingContext)

  const value = watch(name)
  const inpId = useId()
  const reg = register(name, options)

  useEffect(() => {
    if (autoFocus) {
      setFocus(name)
    }
  }, [autoFocus, name])

  return (
    <div className={clsx('form-floating mb-3 has-validation', containerClassNames)}>
      <input
        type={type}
        className={clsx(
          'form-control ',
          { 'is-invalid': path(name.split('.'), errors) },
          className
        )}
        id={inpId}
        autoComplete="off"
        {...reg}
        value={value ?? ''}
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
