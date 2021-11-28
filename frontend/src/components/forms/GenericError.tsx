import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'

import { ExtendedError } from '../../shared/types/extendedError'
import { errorContext } from '../generic/ErrorContext'

export const GenericError = () => {
  const { t } = useTranslation()
  const { error } = useContext(errorContext)

  const isExtended = (e: any): e is ExtendedError => 'status' in e

  return error && isExtended(error) && !('field' in error) ? (
    <Alert variant={error.status === 500 ? 'danger' : 'warning'}>
      {t(error.message as TFuncKey)}
    </Alert>
  ) : null
}
