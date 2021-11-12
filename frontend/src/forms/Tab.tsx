import React, { FC } from 'react'
import { TFuncKey } from 'react-i18next'

import { Jsx } from '../shared/types/generic'

export type OwnProps = {
  title: TFuncKey
}

export const Tab: FC<OwnProps> = ({ children }: Jsx) => {
  return <div className="">{children}</div>
}
