import clsx from 'clsx'
import { path } from 'ramda'
import { isEmptyString } from 'ramda-adjunct'
import { InputHTMLAttributes } from 'react'
import type { RegisterOptions } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import { useAutoFocus } from '~hooks/useAutoFocus'
import { useId } from '~hooks/useId'

import { ErrorInfo } from './ErrorInfo'

type OwnProps = {
  label: TFuncKey
  name: string
  options?: RegisterOptions
  containerClasses?: string
} & InputHTMLAttributes<HTMLInputElement>

export const TextInput = ({
  name,
  label,
  options,
  type = 'text',
  className,
  placeholder,
  containerClasses,
  autoFocus,
  ...props
}: OwnProps) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const inpId = useId()

  useAutoFocus(name, autoFocus)

  return (
    <div className={clsx('form-floating has-validation', containerClasses)}>
      <input
        type={type}
        className={clsx('form-control', { 'is-invalid': path(name.split('.'), errors) }, className)}
        id={inpId}
        autoComplete="off"
        {...register(name, {
          setValueAs: <T extends any>(u: T) => (isEmptyString(u) ? undefined : u),
          ...options
        })}
        readOnly={props.readOnly}
        required={!!options?.required}
        placeholder={placeholder ?? ' '}
        {...props}
      />
      <label htmlFor={inpId}>{t(label)}</label>
      <ErrorInfo name={name} />
    </div>
  )
}
