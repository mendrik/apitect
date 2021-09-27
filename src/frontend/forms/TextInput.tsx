import clsx from 'clsx'
import React, { FC, InputHTMLAttributes, useContext } from 'react'
import type { RegisterOptions } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { ErrorInfo } from '../components/ErrorInfo'
import { progressContext } from '../contexts/progress'
import { useId } from '../hooks/useId'
import { formWrappingContext } from './Form'

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
  const { isWorking } = useContext(progressContext)
  const { promise } = useContext(formWrappingContext)

  const value = watch(props.name)
  const inpId = useId()
  return (
    <div className={clsx('form-floating mb-3 has-validation', className)} {...props}>
      <input
        type={type}
        className={clsx('form-control ', { 'is-invalid': errors?.[props.name] != null })}
        id={inpId}
        autoComplete="off"
        {...props}
        {...register(props.name, options)}
        value={value}
        readOnly={props.readOnly || isWorking(promise)}
        required={!!options?.required}
        placeholder=" "
      />
      <label htmlFor={inpId}>{t(label)}</label>
      <ErrorInfo name={props.name} />
    </div>
  )
}
