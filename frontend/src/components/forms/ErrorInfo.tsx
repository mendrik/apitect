import type { TFuncKey } from 'i18next'
import { last, pathOr } from 'ramda'
import { FieldError, useFormContext } from 'react-hook-form'

import { Html } from '../generic/Html'

type OwnProps = {
  name: string
}
export const ErrorInfo = ({ name }: OwnProps) => {
  const {
    formState: { errors }
  } = useFormContext()
  const path = name.split('.')
  const error = pathOr<FieldError | undefined>(undefined, path, errors)
  return error ? (
    <Html
      localeKey={error.message as TFuncKey}
      options={{ field: last(path) }}
      className="error-info"
    />
  ) : null
}
