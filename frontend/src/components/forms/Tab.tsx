import React from 'react'
import { TFuncKey } from 'react-i18next'
import { Jsx } from '~shared/types/generic'

export type OwnProps = {
  title: TFuncKey
}

export const Tab = ({ children }: Jsx<OwnProps>) => <div className="">{children}</div>
