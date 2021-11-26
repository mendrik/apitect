import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'
import { Jsx, Milliseconds } from 'shared/types/generic'

import { progressContext } from '../../contexts/withProgress'
import { formWrappingContext } from './Form'
import { Spinner } from './Spinner'

type OwnProps = {
  localeKey: TFuncKey
  spinnerDelay?: Milliseconds
}

export const SubmitButton = ({ localeKey, spinnerDelay = 0.4 }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const { promise } = useContext(formWrappingContext)
  const { isWorking } = useContext(progressContext)
  return (
    <Button
      type="submit"
      disabled={isWorking(promise)}
      variant="primary"
      className="d-flex flex-row ps-2 justify-content-center"
    >
      <Spinner spinnerDelay={spinnerDelay} promise={promise} />
      <span className="ms-1">{t(localeKey)}</span>
    </Button>
  )
}