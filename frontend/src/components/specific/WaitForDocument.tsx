import { useStore } from 'effector-react'
import React, { useEffect } from 'react'

import { projectFx } from '../../events/tree'
import { Jsx } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'

export const WaitForDocument = ({ children }: Jsx) => {
  const { document } = useStore($appStore)
  useEffect(() => void projectFx(), [])
  return document ? <div>{children}</div> : null
}
