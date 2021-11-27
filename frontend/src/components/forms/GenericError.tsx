import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { errorContext } from '../generic/ErrorBoundary'

export const GenericError = () => {
  const { t } = useTranslation()
  const { error } = useContext(errorContext)

  return error && !('field' in error) ? (
    <Alert variant={error.status === 500 ? 'danger' : 'warning'}>
      <Alert.Heading>{t('common.unexpectedError')}</Alert.Heading>
      {error.message}
    </Alert>
  ) : null
}
