import { useStore } from 'effector-react'
import React, { useEffect } from 'react'

import { documentFx } from '../../events/tree'
import { Jsx } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'

export const WaitForDocument = ({ children }: Jsx) => {
  const { document } = useStore($appStore)
  useEffect(() => void documentFx(), [])
  return document ? <div>{children}</div> : null
}
