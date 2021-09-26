import { useEffect } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const useServerError = (e: any, setError: UseFormSetError<any>): void => {
  const { t } = useTranslation()
  useEffect(() => {
    if (e?.field != null) {
      console.log(t(e.message))
      setError(e.field, { message: t(e.message, e) as string })
    }
  }, [e, setError, t])
}
