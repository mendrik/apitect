import clsx from 'clsx'
import { path } from 'ramda'
import { isEmptyString } from 'ramda-adjunct'
import React, { InputHTMLAttributes, useContext, useEffect } from 'react'
import type { RegisterOptions } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import { progressContext } from '../contexts/withProgress'
import { useId } from '../hooks/useId'
import { Fn, Jsx } from '../shared/types/generic'
import { formWrappingContext } from './Form'

type OwnProps = {
  mask: string
  name: string
  format: Record<string, [RegExp, Fn<string>]>
  options?: RegisterOptions
  containerClassNames?: string
} & InputHTMLAttributes<HTMLInputElement>

export const MaskedInput = ({
  name,
  options,
  className,
  placeholder,
  containerClassNames,
  autoFocus,
  ...props
}: Jsx<OwnProps>) => {
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
    <input
      type="text"
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
  )
}
