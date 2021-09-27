import React, { FC } from 'react'
import { TFuncKey, useTranslation } from 'react-i18next'

import { ReactComponent as SuccessSvg } from '../assets/success.svg'
import { Html } from './Html'

type OwnProps = {
  title: TFuncKey
  body: TFuncKey
}

export const SuccessView: FC<OwnProps> = ({ title, body, children }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="w-100 d-flex flex-row gap-4">
        <div className="w-25">
          <SuccessSvg />
        </div>
        <div className="d-flex flex-column gap-4 flex-grow-1">
          <h3>{t(title)}</h3>
          <Html localeKey={body} />
        </div>
      </div>
      {children}
    </>
  )
}
