import React from 'react'
import { useTranslation } from 'react-i18next'

import { valueListFx } from '../../events/project'
import useProgress from '../../hooks/useProgress'
import { usePromise } from '../../hooks/usePromise'
import { Jsx } from '../../shared/types/generic'

type OwnProps = {
  tag?: string
  nodeIds: string[]
}

export const VisualValueList = ({ tag, nodeIds }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const [withProgress, status] = useProgress()
  usePromise(() => withProgress(valueListFx({ tag, nodeIds })), true, false)

  return status.is === 'done' ? <div>Loaded</div> : <div>Loading</div>
}
