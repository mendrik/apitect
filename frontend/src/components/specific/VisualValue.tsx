import { useStore } from 'effector-react'
import React, { useContext } from 'react'

import { useView, ViewMethods } from '../../hooks/useView'
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
  tag?: string
}

export enum Views {
  Display,
  Edit
}

export type ViewUtils = { view: Views } & ViewMethods<'Display' | 'Edit'>

const getEditor = (nodeType: NodeType) => {
  switch (nodeType) {
    case NodeType.String:
      return StringEditor
    default:
      return null
  }
}

export const VisualValue = ({ nodeId, value, tag }: Jsx<OwnProps>) => {
  const views = useView(Views)
  const { nodeMap } = useContext(dashboardContext)
  const { nodeSettings } = useStore($appStore)
  const node: Node = nodeMap[nodeId]
  const settings = nodeSettings[value?.nodeId ?? '']
  const params = { node, settings, value, views } as any

  const Editor = getEditor(node.nodeType)

  return (
    <li key={nodeId} tabIndex={0} onFocus={views.editView}>
      {Editor && <Editor {...params} />}
    </li>
  )
}
