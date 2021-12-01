import { difference } from 'ramda'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDeepCompareEffect } from 'react-use'

import { valueListFx } from '../../events/project'
import useProgress from '../../hooks/useProgress'
import { usePromise } from '../../hooks/usePromise'
import { Value } from '../../shared/types/domain/values/value'
import { Jsx } from '../../shared/types/generic'
import { ValueList } from '../../shared/types/response/valueList'
import { Placeholder } from '../generic/Placeholder'

type OwnProps = {
  tag?: string
  visibleNodeIds: string[]
  newNodeIds: string[]
}

export const VisualValueList = ({ tag, visibleNodeIds, newNodeIds }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const [withProgress, status] = useProgress<ValueList>()
  const valueMap = useRef<Map<string, Value>>(new Map()).current
  const trigger = usePromise(() => {
    const missingNodes = difference(newNodeIds, Array.from(valueMap.keys()))
    return missingNodes
      ? withProgress(
          valueListFx({
            tag,
            nodeIds: missingNodes
          })
        )
      : Promise.reject()
  })
  useDeepCompareEffect(trigger, [newNodeIds, tag])

  useEffect(() => {
    if (status.is === 'done') {
      status.result.values.forEach(v => {
        valueMap.set(v.nodeId, v)
      })
    }
  }, [status])

  return status.is === 'running' && valueMap.size === 0 ? (
    <Placeholder.List lines={visibleNodeIds.length} />
  ) : (
    <div>Loaded</div>
  )
}
