import { useTranslation } from 'react-i18next'
import { Jsx } from '~shared/types/generic'

import { LocaleKey } from '../../type-patches/locales'

type OwnProps = {
  title: LocaleKey
}

export const FieldSet = ({ title, children }: Jsx<OwnProps>) => {
  const { t } = useTranslation()

  return (
    <fieldset className="fieldset d-grid gap-2" title={t(title) as string}>
      {children}
    </fieldset>
  )
}
