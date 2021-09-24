import clsx from 'clsx'
import React, { FC, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { useId } from '../hooks/useId'

type OwnProps = {
  label: TFuncKey
} & InputHTMLAttributes<HTMLInputElement>

export const TextInput: FC<OwnProps> = ({ label, type = 'text', className, ...props }) => {
  const { t } = useTranslation()
  const { register } = useFormContext()
  const inpId = useId()
  return (
    <div className={clsx('form-floating mb-3', className)} {...props}>
      <input
        type={type}
        className="form-control"
        id={inpId}
        {...props}
        {...register}
        placeholder=" "
      />
      <label htmlFor={inpId}>{t(label)}</label>
    </div>
  )
}
