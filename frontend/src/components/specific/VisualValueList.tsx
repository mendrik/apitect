import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDeepCompareEffect } from 'react-use'

import { valueListFx } from '../../events/project'
import useProgress from '../../hooks/useProgress'
import { usePromise } from '../../hooks/usePromise'
import { Jsx } from '../../shared/types/generic'
import { Placeholder } from '../generic/Placeholder'

type OwnProps = {
  tag?: string
  nodeIds: string[]
}

export const VisualValueList = ({ tag, nodeIds }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const [withProgress, status] = useProgress()
  const trigger = usePromise(() => withProgress(valueListFx({ tag, nodeIds })))
  useDeepCompareEffect(trigger, [nodeIds, tag])

  return status.is === 'done' ? <div>Loaded</div> : <Placeholder.List lines={nodeIds.length} />
}
