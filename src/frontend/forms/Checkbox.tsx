import React, { FC, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { useId } from '../hooks/useId'

type OwnProps = {
  label: TFuncKey
  name: string
} & InputHTMLAttributes<HTMLInputElement>

export const Checkbox: FC<OwnProps> = ({ label, checked, name, value, ...props }) => {
  const { t } = useTranslation()
  const { register } = useFormContext()
  const inpId = useId()
  return (
    <div className="form-check" {...props}>
      <input
        className="form-check-input"
        value={value}
        type="checkbox"
        id={inpId}
        checked={checked}
        {...register(name)}
      />
      <label className="form-check-label user-select-none cursor-pointer" htmlFor={inpId}>
        {t(label)}
      </label>
    </div>
  )
}
