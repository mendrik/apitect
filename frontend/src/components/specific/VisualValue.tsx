import { useStore } from 'effector-react'
import React, { useContext, FocusEvent } from 'react'

import { useOnActivate } from '../../hooks/useOnActivate'
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
  const ref = useOnActivate<HTMLLIElement>(views.editView)

  const node: Node = nodeMap[nodeId]
  const settings = nodeSettings[value?.nodeId ?? '']

  const Editor = getEditor(node.nodeType)

  const childBlur = (ev: FocusEvent) => {
    if (ev.target !== ev.relatedTarget && ev.target.contains(ev.relatedTarget)) {
      console.log('inp blur', ev.target, ev.relatedTarget)
      // ref.current.focus()
    }
  }

  return (
    <li tabIndex={0} ref={ref} onFocus={childBlur}>
      {Editor ? (
        <Editor node={node} {...views} settings={settings as any} value={value as any} tag={tag} />
      ) : null}
    </li>
  )
}
