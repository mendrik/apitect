import clsx from 'clsx'
import { useStore } from 'effector-react'
import { cond, ifElse, pipe, propEq, when } from 'ramda'
import React, { KeyboardEvent, useRef, useState } from 'react'
import styled from 'styled-components'
import { ZodError } from 'zod'
import { useView } from '~hooks/useView'
import { NodeType } from '~shared/types/domain/nodeType'
import { getStringValidator, StringValue } from '~shared/types/domain/values/stringValue'
import { StringSettings } from '~shared/types/forms/nodetypes/stringSettings'
import { Jsx, Maybe } from '~shared/types/generic'

import { Palette } from '../../css/colors'
import { updateValueFx } from '../../events/values'
import { $nodeSettings } from '../../stores/$nodeSettingsStore'
import { EditorProps } from '../specific/VisualValue'

export enum Views {
  Display,
  Edit
}

const Text = styled.div`
  width: 100%;
  height: 24px;
`

const TextInput = styled.input`
  &.invalid {
    background-color: ${Palette.error};
  }
`

export const StringEditor = ({ node, value, tag }: Jsx<EditorProps<StringValue>>) => {
  const { view, isEditView, editView, displayView } = useView(Views)
  const [error, setError] = useState<Maybe<ZodError>>()
  const ref = useRef<HTMLDivElement | null>(null)

  const nodeSettings = useStore($nodeSettings)

  const grabFocus = () => ref.current?.focus()

  const displayViewAndFocus = () => pipe(displayView, grabFocus)

  const attemptSave = (e: KeyboardEvent<HTMLInputElement>) => {
    const nodeSetting = nodeSettings[node.id] as StringSettings
    const validator = getStringValidator(nodeSetting)
    const newValue = e.currentTarget.value
    const result = validator.safeParse(newValue)
    if (result.success) {
      void updateValueFx({
        value: newValue,
        nodeId: node.id,
        tag,
        nodeType: NodeType.String
      })
        .then(() => setError(undefined))
        .finally(displayViewAndFocus)
    } else {
      e.stopPropagation()
      setError(result.error)
    }
  }

  const keyMap = cond([
    [propEq('code', 'Escape'), when(isEditView, displayViewAndFocus)],
    [propEq('key', 'Enter'), ifElse(isEditView, attemptSave, editView)],
    [propEq('key', 'Tab'), when(isEditView, attemptSave)],
    [propEq('code', 'ArrowRight'), when(isEditView, (e: Event) => e.stopPropagation())],
    [propEq('code', 'ArrowLeft'), when(isEditView, (e: Event) => e.stopPropagation())]
  ])

  return view === Views.Display ? (
    <Text tabIndex={0} onKeyDown={keyMap} ref={ref}>
      {value?.value}
    </Text>
  ) : (
    <TextInput
      type="text"
      className={clsx('editor', { invalid: error != null })}
      autoFocus
      placeholder={node.name}
      onKeyDown={keyMap}
      defaultValue={value?.value}
    />
  )
}
