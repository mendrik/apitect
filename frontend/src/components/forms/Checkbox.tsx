import clsx from 'clsx'
import { assocPath, ifElse, pathEq } from 'ramda'
import React, { HTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import { Jsx } from '~shared/types/generic'

import { useId } from '../../hooks/useId'

type OwnProps = {
  label: TFuncKey
  name: string
  valueOn?: any
  valueOff?: any
} & HTMLAttributes<HTMLDivElement>

export const Checkbox = ({
  label,
  valueOn = true,
  valueOff = false,
  className,
  name,
  ...props
}: Jsx<OwnProps>) => {
  const { register } = useFormContext()
  const { t } = useTranslation()

  const inpId = useId()
  return (
    <div className={clsx('form-check', className)} {...props}>
      <input
        className="form-check-input"
        type="checkbox"
        id={inpId}
        {...register(name, {
          onChange: ifElse(
            pathEq(['target', 'checked'], true),
            assocPath(['target', 'value'], valueOn),
            assocPath(['target', 'value'], valueOff)
          )
        })}
      />
      <label className="form-check-label user-select-none cursor-pointer" htmlFor={inpId}>
        {t(label)}
      </label>
    </div>
  )
}
