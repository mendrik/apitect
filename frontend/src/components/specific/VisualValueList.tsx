import { useStore, useStoreMap } from 'effector-react'
import { filter, keys, pipe, propEq, without } from 'ramda'
import React, { createContext, useMemo } from 'react'
import { useDeepCompareEffect } from 'react-use'
import styled from 'styled-components'
import useProgress, { Status } from '~hooks/useProgress'
import { usePromise } from '~hooks/usePromise'
import { NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { Jsx } from '~shared/types/generic'
import { ValueList } from '~shared/types/response/valueList'
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

type ValueListContext = {
  status: Status<ValueList>
  nodeIds: NodeId[]
}

export const valueListContext = createContext<ValueListContext>({} as any)

export const VisualValueList = ({ tag }: Jsx<OwnProps>) => {
  const values = useStoreMap(
    $valuesStore,
    pipe<Value[], Value[], Record<NodeId, Value>>(filter(propEq('tag', tag)), byProp('nodeId'))
  )

  const nodeIds = useStore($visibleNodes)
  const missingNodeIds = useMemo(() => without(keys(values), nodeIds), [values, nodeIds])
  const [withProgress, status] = useProgress<ValueList>()
  const trigger = usePromise(() => withProgress(valueListFx({ tag, nodeIds: missingNodeIds })))
  useDeepCompareEffect(trigger, [tag, missingNodeIds])

  return (
    <valueListContext.Provider value={{ status, nodeIds: missingNodeIds }}>
      <Values>
        {nodeIds.map(nodeId => (
          <VisualValue key={nodeId} value={values[nodeId]} tag={tag} nodeId={nodeId} />
        ))}
      </Values>
    </valueListContext.Provider>
  )
}
