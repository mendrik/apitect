import clsx from 'clsx'
import { useStore } from 'effector-react'
import { cond, propEq } from 'ramda'
import React, { KeyboardEvent, useRef, useState } from 'react'
import styled from 'styled-components'
import { ZodError, ZodType } from 'zod'
import { useView } from '~hooks/useView'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { getStringValidator } from '~shared/types/domain/values/stringValue'
import { Value } from '~shared/types/domain/values/value'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'
import { StringSettings } from '~shared/types/forms/nodetypes/stringSettings'
import { Jsx } from '~shared/types/generic'

import { Palette } from '../../css/colors'
import { updateValueFx } from '../../events/values'
import { $nodeSettings } from '../../stores/$nodeSettingsStore'
import { $mappedNodesStore } from '../../stores/$treeStore'
import { preventDefault as pd } from '../../utils/preventDefault'
import { StringEditor } from '../editors/StringEditor'

type OwnProps = {
  nodeId: NodeId
  value?: Value
  tag: string
}

export enum Views {
  Display,
  Edit
}

export type EditorProps = {
  node: Node
  settings?: NodeSettings
  value?: Value
  tag?: string
}

type Editor = {
  component: (e: Jsx<EditorProps>) => JSX.Element | null
  validator: ZodType<unknown>
}

const valueToString = (value?: Value): string | null => {
  if (value == null) {
    return null
  }
  return `${value.value}`
}

const getEditor = <T extends NodeType>(nodeType: T, settings?: NodeSettings): Editor | null => {
  switch (nodeType) {
    case NodeType.String:
      return { component: StringEditor, validator: getStringValidator(settings as StringSettings) }
    default:
      return null // todo throw Error instead when all are implemented
  }
}

const StyledLi = styled.li`
  padding-left: 3px;
  &.editing {
    padding-left: 0;
  }

  &.invalid > input[type='text'] {
    background-color: ${Palette.error};
  }
`

export const VisualValue = ({ nodeId, value, tag }: Jsx<OwnProps>) => {
  const { view, displayView, editView } = useView(Views)
  const nodeMap = useStore($mappedNodesStore)
  const nodeSettings = useStore($nodeSettings)
  const ref = useRef<HTMLLIElement>(null)
  const [error, setError] = useState<ZodError<string> | undefined>()

  const node: Node = nodeMap[nodeId]!
  const settings = nodeSettings[value?.nodeId ?? '']
  const Editor = getEditor(node.nodeType, nodeSettings[nodeId])
  const editorProps = { node, settings, value, tag }

  const handleBlur = () => {
    displayView()
    setError(undefined)
  }

  const handleFocus = () => {
    editView()
  }

  const grabFocus = () => ref.current?.focus()

  const handleAbort = () => {
    ref.current?.focus()
    handleBlur()
  }

  const handleEnter = (ev: KeyboardEvent<HTMLElement>) => {
    if (view === Views.Display) {
      editView()
    } else {
      if (Editor != null) {
        const newValue = (ev.target as HTMLInputElement).value
        const result = Editor.validator.safeParse(newValue)
        if (result.success) {
          grabFocus()
          displayView()
          updateValueFx({ value: newValue, nodeId, tag, nodeType: node.nodeType as any }) // todo remove any when all is implemented
        } else {
          setError(result.error)
        }
      }
    }
  }

  const keyMap = cond([
    [propEq('code', 'Escape'), pd(handleAbort)],
    [propEq('code', 'Enter'), pd(handleEnter)],
    [propEq('code', 'ArrowUp'), grabFocus],
    [propEq('code', 'ArrowDown'), grabFocus],
    [propEq('code', 'Tab'), grabFocus]
  ])

  return (
    <StyledLi
      onKeyDown={keyMap}
      tabIndex={0}
      ref={ref}
      onBlur={handleBlur}
      onFocus={handleFocus}
      className={clsx({ invalid: error, editing: view === Views.Edit })}
    >
      {view === Views.Display
        ? valueToString(value)
        : Editor && <Editor.component {...editorProps} />}
    </StyledLi>
  )
}
