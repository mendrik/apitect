import { useList, useStore, useStoreMap } from 'effector-react'
import { filter, keys, pipe, propEq, without } from 'ramda'
import React, { useMemo } from 'react'
import { useDeepCompareEffect } from 'react-use'
import styled from 'styled-components'
import { Value } from '~shared/types/domain/values/value'
import { Jsx } from '~shared/types/generic'
import { byProp } from '~shared/utils/ramda'

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
  const values = useStoreMap(
    $valuesStore,
    pipe<Value[], Value[], Record<string, Value>>(
      filter(propEq('tag', tag)),
      byProp('nodeId' as any)
    )
  )
  const nodeIds = useStore($visibleNodes)
  const missingNodeIds = useMemo(() => without(keys(values), nodeIds), [values, nodeIds])
  useDeepCompareEffect(
    () => void valueListFx({ tag, nodeIds: missingNodeIds }),
    [tag, missingNodeIds]
  )
  const list = useList($visibleNodes, (nodeId: string) => (
    <VisualValue key={nodeId} value={values[nodeId]} tag={tag} nodeId={nodeId} />
  ))

  return <Values>{list}</Values>
}
