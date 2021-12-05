import { useContext, useEffect } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { isExtendedError } from '~forms/GenericError'

import { errorContext } from '../components/generic/ErrorContext'

export const useServerError = (setError: UseFormSetError<any>): void => {
  const { t } = useTranslation()
  const { error } = useContext(errorContext)
  useEffect(() => {
    if (error && isExtendedError(error) && error?.field != null) {
      setError(error.field, error)
    }
  }, [error, setError, t])
}
