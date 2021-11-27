import React from 'react'
import { Button } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { Jsx } from 'shared/types/generic'

type OwnProps = {
  localeKey: TFuncKey
}

export const SubmitButton = ({ localeKey }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  return (
    <Button type="submit" variant="primary" className="d-flex flex-row ps-2 justify-content-center">
      <span className="ms-1">{t(localeKey)}</span>
    </Button>
  )
}
