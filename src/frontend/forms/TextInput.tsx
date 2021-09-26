import clsx from 'clsx'
import React, { FC, InputHTMLAttributes } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
import type { RegisterOptions } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { useId } from '../hooks/useId'

type OwnProps = {
  label: TFuncKey
  name: string
  options?: RegisterOptions
} & InputHTMLAttributes<HTMLInputElement>

export const TextInput: FC<OwnProps> = ({ label, options, type = 'text', className, ...props }) => {
  const { t } = useTranslation()
  const {
    watch,
    register,
    formState: { errors }
  } = useFormContext()
  const value = watch(props.name)
  const error: FieldError = errors[props.name]
  const inpId = useId()
  return (
    <div className={clsx('form-floating mb-3 has-validation', className)} {...props}>
      <input
        type={type}
        className={clsx('form-control ', { 'is-invalid': !!error })}
        id={inpId}
        autoComplete="off"
        {...props}
        {...register(props.name, options)}
        value={value}
        required={!!options?.required}
        placeholder=" "
      />
      <label htmlFor={inpId}>{t(label)}</label>
      {error && (
        <div className="invalid-feedback">
          {t(error.message as TFuncKey, { field: props.name })}
        </div>
      )}
    </div>
  )
}
