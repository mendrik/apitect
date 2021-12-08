import { last, pathOr } from 'ramda'
import React from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
import { TFuncKey } from 'react-i18next'
import { Jsx } from '~shared/types/generic'

import { Html } from '../generic/Html'

type OwnProps = {
  name: string
}
export const ErrorInfo = ({ name }: Jsx<OwnProps>) => {
  const {
    formState: { errors }
  } = useFormContext()
  const path = name.split('.')
  const error: FieldError = pathOr<any>(undefined, path, errors)
  return error ? (
    <Html localeKey={error.message as TFuncKey} options={{ field: last(path) }} />
  ) : null
}
