import { difference } from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDeepCompareEffect } from 'react-use'
import styled from 'styled-components'

import { valueListFx } from '../../events/project'
import useProgress from '../../hooks/useProgress'
import { usePromise } from '../../hooks/usePromise'
import { Value } from '../../shared/types/domain/values/value'
import { Jsx } from '../../shared/types/generic'
import { ValueList } from '../../shared/types/response/valueList'
import { VisualValue } from './VisualValue'

type OwnProps = {
  tag?: string
  visibleNodeIds: string[]
  newNodeIds: string[]
}

const Values = styled.ol`
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;

  > li {
    height: 24px;
  }
`

export const VisualValueList = ({ tag, visibleNodeIds, newNodeIds }: Jsx<OwnProps>) => {
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

  return (
    <Values>
      {visibleNodeIds.map(id => (
        <VisualValue key={id} value={valueMap.get(id)} nodeId={id} tag={tag} />
      ))}
    </Values>
  )
}
