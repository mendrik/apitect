import { difference } from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import React, { useEffect, useMemo, useRef } from 'react'
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
  const missingNodes = useMemo(
    () => difference(newNodeIds, Array.from(valueMap.keys())),
    [newNodeIds]
  )
  const trigger = usePromise(() =>
    withProgress(
      valueListFx({
        tag,
        nodeIds: missingNodes
      })
    )
  )

  useDeepCompareEffect(() => {
    if (isNotEmpty(missingNodes)) {
      trigger()
    }
  }, [newNodeIds, tag, missingNodes])

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
