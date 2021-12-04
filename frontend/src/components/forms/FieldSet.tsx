import React from 'react'
import { TFuncKey, useTranslation } from 'react-i18next'
import { Jsx } from '~shared/types/generic'

type OwnProps = {
  title: TFuncKey
}

export const FieldSet = ({ title, children }: Jsx<OwnProps>) => {
  const { t } = useTranslation()

  return (
    <fieldset className="fieldset" title={t(title) as string}>
      {children}
    </fieldset>
  )
}
