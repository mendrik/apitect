import clsx from 'clsx'
import { assocPath, ifElse, pathEq } from 'ramda'
import { HTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ErrorInfo } from '~forms/ErrorInfo'
import { useId } from '~hooks/useId'

import { LocaleKey } from '../../type-patches/locales'

type OwnProps = {
  label: LocaleKey
  name: string
  valueOn?: unknown
  valueOff?: unknown
} & HTMLAttributes<HTMLDivElement>

export const Checkbox = ({
  label,
  valueOn = true,
  valueOff = false,
  className,
  name,
  ...props
}: OwnProps) => {
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
      <ErrorInfo name={name} />
    </div>
  )
}
