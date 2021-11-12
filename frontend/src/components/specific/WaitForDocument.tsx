import { useStore } from 'effector-react'
import React from 'react'

import { useRequest } from '../../hooks/useRequest'
import { Jsx } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'

export const WaitForDocument = ({ children }: Jsx) => {
  useRequest({ type: 'DOCUMENT' })
  const { document } = useStore($appStore)

  return document ? <div>{children}</div> : null
}
