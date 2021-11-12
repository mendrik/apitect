import React from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'

import { Jsx } from '../shared/types/generic'

type OwnProps = {
  name: string
}
export const ErrorInfo = ({ name }: Jsx<OwnProps>) => {
  const {
    formState: { errors }
  } = useFormContext()
  const { t } = useTranslation()
  const error: FieldError = errors?.[name]

  return error ? (
    <div className="invalid-feedback">{t(error.message as TFuncKey, { field: name })}</div>
  ) : null
}
