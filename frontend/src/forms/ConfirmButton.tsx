import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'

import { State } from '../hooks/usePromise'
import { Jsx } from '../shared/types/generic'
import { Spinner } from './Spinner'

type OwnProps = {
  localeKey: TFuncKey
  confirmationKey?: TFuncKey
  state: State<any>
}

export const ConfirmButton = ({
  localeKey,
  confirmationKey = 'common.yesImSure',
  state
}: Jsx<OwnProps>) => {
  const { t } = useTranslation()

  const title = (
    <span className="d-inline-flex flex-row">
      <Spinner promise={state.name} />
      <span>{t(localeKey)}</span>
    </span>
  )

  return (
    <DropdownButton title={title}>
      <Dropdown.Item onClick={() => state.trigger()}>{t(confirmationKey)}</Dropdown.Item>
    </DropdownButton>
  )
}
