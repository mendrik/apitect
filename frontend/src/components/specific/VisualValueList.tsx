import { useList, useStore, useStoreMap } from 'effector-react'
import { filter, prop, propEq, without } from 'ramda'
import React, { useMemo } from 'react'
import { useDeepCompareEffect } from 'react-use'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { valueListFx } from '../../events/values'
import { $tagValueMap, $valuesStore } from '../../stores/$valuesStore'
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
  const tagValues = useStoreMap($valuesStore, filter(propEq('tag', tag)))
  const nodeIds = useStore($visibleNodes)
  const values = useStoreMap($tagValueMap, prop(tag))
  const missingNodeIds = useMemo(
    () => without(tagValues.map(prop('nodeId')), nodeIds),
    [tagValues, nodeIds]
  )
  useDeepCompareEffect(
    () => void valueListFx({ tag, nodeIds: missingNodeIds }),
    [tag, missingNodeIds]
  )
  const list = useList($visibleNodes, (nodeId: string) => (
    <VisualValue key={nodeId} value={values[nodeId]} tag={tag} nodeId={nodeId} />
  ))

  return <Values>{list}</Values>
}
