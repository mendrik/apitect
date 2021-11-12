import { useStore } from 'effector-react'
import React, { useEffect } from 'react'

import { documentLoaded } from '../../events/tree'
import { Jsx } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'

export const WaitForDocument = ({ children }: Jsx) => {
  const { document, api } = useStore($appStore)
  useEffect(() => void api.document().then(documentLoaded), [])
  return document ? <div>{children}</div> : null
}
