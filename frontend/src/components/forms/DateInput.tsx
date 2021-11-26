import clsx from 'clsx'
import { useId } from 'hooks/useId'
import { path } from 'ramda'
import React, { InputHTMLAttributes, useContext } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import { Jsx } from 'shared/types/generic'
import styled from 'styled-components'

import { progressContext } from '../../contexts/withProgress'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import { useDatepicker } from '../../hooks/useDatepicker'
import { ErrorInfo } from './ErrorInfo'
import { formWrappingContext } from './Form'

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
  type = 'date',
  className,
  containerClassNames,
  autoFocus,
  ...props
}: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<{ [K in typeof name]: Date | undefined }>()
  const { isWorking } = useContext(progressContext)
  const { promise } = useContext(formWrappingContext)

  const inpId = useId()

  useAutoFocus(name, autoFocus)

  const CalendarIcon = useDatepicker(name)

  return (
    <div className={clsx('form-floating has-validation position-relative', containerClassNames)}>
      <Input
        {...register(name, {
          valueAsDate: true,
          ...options
        })}
        className={clsx('form-control', { 'is-invalid': path(name.split('.'), errors) }, className)}
        id={inpId}
        autoComplete="off"
        readOnly={props.readOnly || isWorking(promise)}
        required={!!options?.required}
        type={type}
        onBlur={ev => {
          setValue(name, (ev.target as HTMLInputElement).value as any)
        }}
        {...props}
      />
      {CalendarIcon}
      <label htmlFor={inpId}>{t(label)}</label>
      <ErrorInfo name={name} />
    </div>
  )
}
