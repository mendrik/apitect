import { useStore, useStoreMap } from 'effector-react'
import { filter, keys, pipe, propEq, without } from 'ramda'
import { useMemo } from 'react'
import { useDeepCompareEffect } from 'react-use'
import styled from 'styled-components'
import { NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { mapByProperty } from '~shared/utils/ramda'
import { $valuesStore } from '~stores/$valuesStore'
import { $visibleNodes } from '~stores/$visibileNodes'

import { valueListFx } from '../../../events/values'
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

export const VisualValueList = ({ tag }: OwnProps) => {
  const loading = useStore(valueListFx.pending)
  const nodeIds = useStore($visibleNodes)
  const values: Record<NodeId, Value> = useStoreMap(
    $valuesStore,
    pipe(filter(propEq('tag', tag)), mapByProperty('nodeId'))
  )

  const missingNodeIds = useMemo(() => without(keys(values), nodeIds), [values, nodeIds])
  useDeepCompareEffect(
    () => void valueListFx({ tag, nodeIds: missingNodeIds }),
    [tag, missingNodeIds]
  )

  return (
    <Values>
      {nodeIds.map(nodeId => (
        <VisualValue
          key={nodeId}
          value={values[nodeId]}
          tag={tag}
          nodeId={nodeId}
          loading={loading && missingNodeIds.includes(nodeId)}
        />
      ))}
    </Values>
  )
}
