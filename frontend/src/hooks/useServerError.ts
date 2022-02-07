import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { isExtendedError } from '~forms/GenericError'

import { $apiError } from '../events/api'

export const useServerError = (setError: UseFormSetError<any>): void => {
  const { t } = useTranslation()
  const error = useStore($apiError)

  useEffect(() => {
    if (error && isExtendedError(error) && error?.field != null) {
      setError(error.field, error)
    }
  }, [error, setError, t])
}
