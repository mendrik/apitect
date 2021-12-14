import { useStore, useStoreMap } from 'effector-react'
import { filter, keys, pipe, propEq, without } from 'ramda'
import React, { useMemo } from 'react'
import { useDeepCompareEffect } from 'react-use'
import styled from 'styled-components'
import useProgress from '~hooks/useProgress'
import { usePromise } from '~hooks/usePromise'
import { NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { Jsx } from '~shared/types/generic'
import { ValueList } from '~shared/types/response/valueList'
import { byProp } from '~shared/utils/ramda'
import { $valuesStore } from '~stores/$valuesStore'
import { $visibleNodes } from '~stores/$visibileNodes'

import { valueListFx } from '../../events/values'
import { VisualValue } from './VisualValue'

type OwnProps = {
  tag: string
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

export const VisualValueList = ({ tag }: Jsx<OwnProps>) => {
  const values: Record<NodeId, Value> = useStoreMap(
    $valuesStore,
    pipe(filter(propEq('tag', tag)), byProp('nodeId'))
  )

  const nodeIds = useStore($visibleNodes)
  const missingNodeIds = useMemo(() => without(keys(values), nodeIds), [values, nodeIds])
  const [withProgress, status] = useProgress<ValueList>()
  const trigger = usePromise(() => withProgress(valueListFx({ tag, nodeIds: missingNodeIds })))
  useDeepCompareEffect(trigger, [tag, missingNodeIds])

  return (
    <Values>
      {nodeIds.map(nodeId => {
        const loading = status.is === 'running' && missingNodeIds.includes(nodeId)
        return (
          <VisualValue
            key={nodeId}
            value={values[nodeId]}
            tag={tag}
            nodeId={nodeId}
            loading={loading}
          />
        )
      })}
    </Values>
  )
}
