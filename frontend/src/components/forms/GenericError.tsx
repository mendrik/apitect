import { Alert } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { ExtendedError } from '~shared/types/extendedError'
import { Jsx } from '~shared/types/generic'

export const isExtendedError = (e: any): e is ExtendedError => 'status' in e

type OwnProps = {
  error: Error | null
}

export const GenericError = ({ error }: Jsx<OwnProps>) => {
  const { t } = useTranslation()

  return error != null && isExtendedError(error) && !('field' in error) ? (
    <Alert variant={error.status === 500 ? 'danger' : 'warning'}>
      {t(error.message as TFuncKey)}
    </Alert>
  ) : null
}
