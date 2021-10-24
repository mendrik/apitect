import React, { FC } from 'react'
import { TFuncKey } from 'react-i18next'

export type OwnProps = {
  title: TFuncKey
}

export const Tab: FC<OwnProps> = ({ children }) => {
  return <div className="">{children}</div>
}
