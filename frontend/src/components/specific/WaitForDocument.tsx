import { useStore } from 'effector-react'
import React, { FC } from 'react'

import { useRequest } from '../../hooks/useRequest'
import appStore from '../../stores/appStore'

export const WaitForDocument: FC = ({ children }) => {
  useRequest({ type: 'DOCUMENT' })
  const { document } = useStore(appStore)

  return document ? <div>{children}</div> : null
}
