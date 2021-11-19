import { IconCalendar } from '@tabler/icons'
import clsx from 'clsx'
import { path } from 'ramda'
import React, { InputHTMLAttributes, useContext } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { progressContext } from '../contexts/withProgress'
import { useAutoFocus } from '../hooks/useAutoFocus'
import { useDatepicker } from '../hooks/useDatepicker'
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

const Button = styled.button`
  position: absolute;
  width: 58px;
  height: 100%;
  top: 0;
  right: 0;
  padding: 1px;
  box-shadow: none !important;
  color: #999;
  &:active {
    background-color: #efefef;
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
    formState: { errors }
  } = useFormContext<{ [K in typeof name]: Date | undefined }>()
  const { isWorking } = useContext(progressContext)
  const { promise } = useContext(formWrappingContext)

  const inpId = useId()

  useAutoFocus(name, autoFocus)

  const showCalendar = useDatepicker(name)

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
        {...props}
      />
      <Button
        type="button"
        className="btn p-0 appearance-none"
        tabIndex={-1}
        onClick={showCalendar}
      >
        <IconCalendar className="w-4 h-4" stroke={1} />
      </Button>
      <label htmlFor={inpId}>{t(label)}</label>
      <ErrorInfo name={name} />
    </div>
  )
}
