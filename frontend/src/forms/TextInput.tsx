import clsx from 'clsx'
import React, { FC, InputHTMLAttributes, useContext } from 'react'
import type { RegisterOptions } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { progressContext } from '../contexts/progress'
import { useId } from '../hooks/useId'
import { ErrorInfo } from './ErrorInfo'
import { formWrappingContext } from './Form'

type OwnProps = {
  label: TFuncKey
  name: string
  options?: RegisterOptions
  containerClassNames?: string
} & InputHTMLAttributes<HTMLInputElement>

export const TextInput: FC<OwnProps> = ({
  name,
  label,
  options,
  type = 'text',
  className,
  placeholder,
  containerClassNames,
  ...props
}) => {
  const { t } = useTranslation()
  const {
    watch,
    register,
    formState: { errors }
  } = useFormContext()
  const { isWorking } = useContext(progressContext)
  const { promise } = useContext(formWrappingContext)

  const value = watch(name)
  const inpId = useId()
  return (
    <div className={clsx('form-floating mb-3 has-validation', containerClassNames)}>
      <input
        type={type}
        className={clsx('form-control ', { 'is-invalid': errors?.[name] != null }, className)}
        id={inpId}
        autoComplete="off"
        {...register(name, options)}
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
