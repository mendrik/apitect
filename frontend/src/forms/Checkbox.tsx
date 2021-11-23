import clsx from 'clsx'
import { assocPath, ifElse, pathEq, pipe } from 'ramda'
import React, { HTMLAttributes } from 'react'
import { Controller } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { useId } from '../hooks/useId'
import { Jsx } from '../shared/types/generic'

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
  const { t } = useTranslation()

  const inpId = useId()
  return (
    <div className={clsx('form-check', className)} {...props}>
      <Controller
        name={name}
        render={({ field }) => (
          <input
            className="form-check-input"
            type="checkbox"
            id={inpId}
            value={field.value}
            onBlur={field.onBlur}
            onChange={pipe(
              ifElse(
                pathEq(['target', 'checked'], true),
                assocPath(['target', 'value'], valueOn),
                assocPath(['target', 'value'], valueOff)
              ),
              field.onChange
            )}
          />
        )}
      />
      <label className="form-check-label user-select-none cursor-pointer" htmlFor={inpId}>
        {t(label)}
      </label>
    </div>
  )
}
