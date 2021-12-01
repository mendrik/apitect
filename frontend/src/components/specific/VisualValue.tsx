import { useStore } from 'effector-react'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { Node } from '../../shared/types/domain/node'
import { NodeType } from '../../shared/types/domain/nodeType'
import { Value } from '../../shared/types/domain/values/value'
import { Jsx } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'
import { dashboardContext } from '../Dashboard'
import { StringEditor } from '../editors/StringEditor'

type OwnProps = {
  nodeId: string
  value: Value | undefined
}

export const VisualValue = ({ nodeId, value }: Jsx<OwnProps>) => {
  const { nodeMap } = useContext(dashboardContext)
  const { t } = useTranslation()
  const { nodeSettings } = useStore($appStore)
  const node: Node = nodeMap[nodeId]
  const settings = nodeSettings[value?.nodeId ?? '']
  const params = { node, settings, value } as any

  switch (node.nodeType) {
    case NodeType.String:
      return <StringEditor {...params} />
    default:
      return null
  }
}
