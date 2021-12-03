import { useStore } from 'effector-react'
import { cond, propEq } from 'ramda'
import React, { FocusEvent, HTMLAttributes, useContext, useRef } from 'react'

import { useView } from '../../hooks/useView'
import { Node } from '../../shared/types/domain/node'
import { NodeType } from '../../shared/types/domain/nodeType'
import { StringValue } from '../../shared/types/domain/values/stringValue'
import { Value } from '../../shared/types/domain/values/value'
import { StringSettings } from '../../shared/types/forms/nodetypes/stringSettings'
import { Jsx, Maybe } from '../../shared/types/generic'
import $appStore from '../../stores/$appStore'
import { preventDefault as pd } from '../../utils/preventDefault'
import { dashboardContext } from '../Dashboard'
import { StringEditor } from '../editors/StringEditor'

type OwnProps = {
  nodeId: string
  value?: Value
  tag?: string
}

export enum Views {
  Display,
  Edit
}

export type EditorProps = {
  node: Node
  settings: Maybe<StringSettings>
  value?: Maybe<StringValue>
  tag?: string
} & HTMLAttributes<HTMLElement>

type Editor = (e: Jsx<EditorProps>) => JSX.Element | null

const valueToString = (value?: Value): string | null => {
  if (value == null) {
    return null
  }
  return `${value.value}`
}

const getEditor = (nodeType: NodeType): Editor | null => {
  switch (nodeType) {
    case NodeType.String:
      return StringEditor
    default:
      return null // todo throw Error instead when all are implemented
  }
}

export const VisualValue = ({ nodeId, value, tag }: Jsx<OwnProps>) => {
  const { view, displayView, editView } = useView(Views)
  const { nodeMap } = useContext(dashboardContext)
  const { nodeSettings } = useStore($appStore)
  const ref = useRef<HTMLLIElement>(null)

  const node: Node = nodeMap[nodeId]
  const settings = nodeSettings[value?.nodeId ?? '']
  const Editor = getEditor(node?.nodeType)
  const editorProps = { node, settings, value, tag }

  const handleBlur = (ev: FocusEvent) => {
    displayView()
  }

  const handleFocus = (ev: FocusEvent) => {
    editView()
  }

  const grabFocus = () => ref.current?.focus()

  const handleAbort = () => {
    ref.current?.focus()
    displayView()
  }

  const handleEnter = () => {
    if (view === Views.Display) {
      editView()
    } else {
      grabFocus()
      displayView()
    }
  }

  const keyMap = cond([
    [propEq('code', 'Escape'), pd(handleAbort)],
    [propEq('code', 'Enter'), pd(handleEnter)],
    [propEq('code', 'ArrowUp'), grabFocus],
    [propEq('code', 'ArrowDown'), grabFocus],
    [propEq('code', 'Tab'), grabFocus]
  ])

  const stopArrowPropagation = cond([
    [propEq('code', 'ArrowRight'), (e: Event) => e.stopPropagation()],
    [propEq('code', 'ArrowLeft'), (e: Event) => e.stopPropagation()]
  ])

  return (
    <li onKeyDown={keyMap} tabIndex={0} ref={ref} onBlur={handleBlur} onFocus={handleFocus}>
      {view === Views.Display
        ? valueToString(value)
        : Editor && <Editor {...(editorProps as any)} onKeyDown={stopArrowPropagation} />}
    </li>
  )
}
