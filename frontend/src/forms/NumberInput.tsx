import { IconChevronDown, IconChevronUp } from '@tabler/icons'
import clsx from 'clsx'
import { always, path, pipe, when } from 'ramda'
import React, { InputHTMLAttributes, useContext } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { progressContext } from '../contexts/withProgress'
import { useAutoFocus } from '../hooks/useAutoFocus'
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
  step?: number
  unit?: string
  precision?: number
} & InputHTMLAttributes<HTMLInputElement>

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
    watch,
    formState: { errors }
  } = useFormContext<{ [K in typeof name]: number | undefined }>()
  const { isWorking } = useContext(progressContext)
  const { promise } = useContext(formWrappingContext)

  const n = watch(name)
  console.log('watch ', n)
  const inpId = useId()

  useAutoFocus(name, autoFocus)

  const format = (value: string) => {
    return value
      .replace(/[^0-9-.]/g, '')
      .replace(/(?!^)-/g, '')
      .replace(/(?<=(.*\..*))\./g, '')
  }

  return (
    <div className={clsx('form-floating mb-3 has-validation', containerClassNames)}>
      <input
        {...register(name, {
          setValueAs: pipe(parseFloat, when(isNaN, always(undefined))),
          onChange: ev => {
            const { value } = ev.target
            ev.target.value = format(value)
          },
          ...options
        })}
        type="text"
        style={{
          paddingRight: '2.5rem'
        }}
        className={clsx('form-control', { 'is-invalid': path(name.split('.'), errors) }, className)}
        id={inpId}
        autoComplete="off"
        readOnly={props.readOnly || isWorking(promise)}
        required={!!options?.required}
        placeholder={placeholder ?? ' '}
        {...props}
      />
      <Buttons>
        <button type="button" className="btn p-0">
          <IconChevronUp className="w-4 h-4" stroke={1} />
        </button>
        <button type="button" className="btn p-0">
          <IconChevronDown className="w-4 h-4" stroke={1} />
        </button>
      </Buttons>
      <label htmlFor={inpId}>{t(label)}</label>
      <ErrorInfo name={name} />
    </div>
  )
}
