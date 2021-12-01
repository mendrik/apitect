import { useStore } from 'effector-react'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { Node } from '../../shared/types/domain/node'
import { Value } from '../../shared/types/domain/values/value'
import { NodeSettings } from '../../shared/types/forms/nodetypes/nodeSettings'
import { Jsx, Maybe } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'
import { dashboardContext } from '../Dashboard'

type OwnProps = {
  nodeId: string
  value: Value | undefined
}

export const VisualValue = ({ nodeId, value }: Jsx<OwnProps>) => {
  const { nodeMap } = useContext(dashboardContext)
  const { t } = useTranslation()
  const { nodeSettings } = useStore($appStore)
  const setting: Maybe<NodeSettings> = nodeSettings[value?.nodeId ?? '']
  const node: Node = nodeMap[nodeId]

  return <div>{node.nodeType.toLowerCase()}</div>
}
