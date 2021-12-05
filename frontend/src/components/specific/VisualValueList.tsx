import { useList, useStore, useStoreMap } from 'effector-react'
import { prop, propEq, without } from 'ramda'
import React, { useMemo } from 'react'
import { useDeepCompareEffect } from 'react-use'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { valueListFx } from '../../events/values'
import { $valuesStore } from '../../stores/$valuesStore'
import { $visibleNodes } from '../../stores/$visibileNodes'
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
  const tagValues = useStoreMap($valuesStore, state => state[tag] ?? [])
  const nodeIds = useStore($visibleNodes)
  const missingNodeIds = useMemo(
    () => without(tagValues.map(prop('nodeId')), nodeIds),
    [tagValues, nodeIds]
  )
  useDeepCompareEffect(
    () => void valueListFx({ tag, nodeIds: missingNodeIds }),
    [tag, missingNodeIds]
  )
  const list = useList($visibleNodes, (nodeId: string) => (
    <VisualValue
      key={nodeId}
      value={tagValues.find(propEq('nodeId', nodeId))}
      tag={tag}
      nodeId={nodeId}
    />
  ))

  return <Values>{list}</Values>
}
