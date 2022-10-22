import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { LocaleKey } from '../../type-patches/locales'

type OwnProps = {
  localeKey: LocaleKey
}

export const SubmitButton = ({ localeKey }: OwnProps) => {
  const { t } = useTranslation()
  return (
    <Button type="submit" variant="primary" className="d-flex flex-row ps-2 justify-content-center">
      <span className="ms-1">{t(localeKey)}</span>
    </Button>
  )
}
