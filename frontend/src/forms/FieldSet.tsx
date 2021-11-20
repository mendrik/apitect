import React, { FC } from 'react'
import { TFuncKey, useTranslation } from 'react-i18next'

type OwnProps = {
  title: TFuncKey
}

export const FieldSet: FC<OwnProps> = ({ title, children }) => {
  const { t } = useTranslation()

  return (
    <fieldset className="fieldset" title={t(title) as string}>
      {children}
    </fieldset>
  )
}
