import { IconChevronDown, IconChevronUp } from '@tabler/icons'
import clsx from 'clsx'
import { path } from 'ramda'
import React, { InputHTMLAttributes } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAutoFocus } from '~hooks/useAutoFocus'
import { useId } from '~hooks/useId'
import { Jsx } from '~shared/types/generic'

import { ErrorInfo } from './ErrorInfo'

type OwnProps = {
  label: TFuncKey
  name: string
  options?: RegisterOptions
  containerClassNames?: string
  min?: number
  max?: number
  step?: number
  precision?: number
} & InputHTMLAttributes<HTMLInputElement>

const Input = styled.input`
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 40px;
  height: 100%;
  top: 0;
  right: 0;
  padding: 1px;

  > button.btn {
    color: #999;
    &:active {
      background-color: #efefef;
    }
    &:focus {
      content: initial;
      box-shadow: none;
    }
  }
`

export const NumberInput = ({
  name,
  label,
  options,
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
  } = useFormContext<{ [K in typeof name]: number | undefined }>()

  const inpId = useId()

  useAutoFocus(name, autoFocus)

  return (
    <div className={clsx('form-floating has-validation appearance-none', containerClassNames)}>
      <Input
        {...register(name, {
          valueAsNumber: true,
          ...options
        })}
        style={{
          paddingRight: '2.5rem'
        }}
        className={clsx('form-control', { 'is-invalid': path(name.split('.'), errors) }, className)}
        id={inpId}
        autoComplete="off"
        required={!!options?.required}
        type="number"
        placeholder={placeholder ?? ' '}
        {...props}
      />
      <Buttons>
        <button type="button" className="btn p-0" tabIndex={-1}>
          <IconChevronUp className="w-4 h-4" stroke={1} />
        </button>
        <button type="button" className="btn p-0" tabIndex={-1}>
          <IconChevronDown className="w-4 h-4" stroke={1} />
        </button>
      </Buttons>
      <label htmlFor={inpId}>{t(label)}</label>
      <ErrorInfo name={name} />
    </div>
  )
}
