import clsx from 'clsx'
import { path } from 'ramda'
import { isEmptyString } from 'ramda-adjunct'
import React, { InputHTMLAttributes, useContext, useEffect } from 'react'
import type { RegisterOptions } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { progressContext } from '../contexts/withProgress'
import { useId } from '../hooks/useId'
import { Jsx } from '../shared/types/generic'
import { ErrorInfo } from './ErrorInfo'
import { formWrappingContext } from './Form'

type OwnProps = {
  label: TFuncKey
  name: string
  options?: RegisterOptions
  containerClassNames?: string
  min?: number
  max?: number
  spinner?: boolean
  step?: number
  unit?: string
  precision?: number
} & InputHTMLAttributes<HTMLInputElement>

export const NumberInput = ({
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
    setFocus,
    formState: { errors }
  } = useFormContext()
  const { isWorking } = useContext(progressContext)
  const { promise } = useContext(formWrappingContext)

  const inpId = useId()

  useEffect(() => {
    if (autoFocus) {
      setFocus(name)
    }
  }, [autoFocus, name])

  return (
    <div className={clsx('form-floating mb-3 has-validation', containerClassNames)}>
      <input
        type={type}
        className={clsx('form-control', { 'is-invalid': path(name.split('.'), errors) }, className)}
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
