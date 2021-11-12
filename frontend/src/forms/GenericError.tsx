import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { formWrappingContext } from './Form'

export const GenericError = () => {
  const { error } = useContext(formWrappingContext)
  const { t } = useTranslation()
  return error && !('field' in error) ? (
    <Alert variant={error.status === 500 ? 'danger' : 'warning'}>
      <Alert.Heading>{t('common.unexpectedError')}</Alert.Heading>
      {error.message}
    </Alert>
  ) : null
}
