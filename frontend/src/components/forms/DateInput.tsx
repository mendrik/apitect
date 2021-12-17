import clsx from 'clsx'
import { parse } from 'date-fns'
import { path } from 'ramda'
import React, { InputHTMLAttributes } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAutoFocus } from '~hooks/useAutoFocus'
import { useDatepicker } from '~hooks/useDatepicker'
import { useId } from '~hooks/useId'
import { Jsx } from '~shared/types/generic'

import { ErrorInfo } from './ErrorInfo'

type OwnProps = {
  label: TFuncKey
  name: string
  options?: RegisterOptions
  containerClassNames?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = styled.input`
  ::-webkit-inner-spin-button,
  ::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }
`

export const DateInput = ({
  name,
  label,
  options,
  className,
  containerClasses,
  autoFocus,
  ...props
}: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors }
  } = useFormContext<{ [K in typeof name]: Date | undefined }>()

  const inpId = useId()
  useAutoFocus(name, autoFocus)

  const CalendarIcon = useDatepicker(name)

  return (
    <div className={clsx('form-floating has-validation position-relative', containerClasses)}>
      <Input
        {...register(name, { ...options, setValueAs: val => parse(val, 'yyyy-MM-dd', new Date()) })}
        className={clsx('form-control', { 'is-invalid': path(name.split('.'), errors) }, className)}
        id={inpId}
        autoComplete="off"
        required={!!options?.required}
        type="date"
        {...props}
      />
      {CalendarIcon}
      <label htmlFor={inpId}>{t(label)}</label>
      <ErrorInfo name={name} />
    </div>
  )
}
