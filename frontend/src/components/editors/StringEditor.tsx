import clsx from 'clsx'
import { useStore } from 'effector-react'
import { cond, ifElse, propEq, when } from 'ramda'
import React, { KeyboardEvent, useState } from 'react'
import styled from 'styled-components'
import { ZodError } from 'zod'
import { useView } from '~hooks/useView'
import { NodeType } from '~shared/types/domain/nodeType'
import { getStringValidator, StringValue } from '~shared/types/domain/values/stringValue'
import { StringSettings } from '~shared/types/forms/nodetypes/stringSettings'
import { Jsx, Maybe } from '~shared/types/generic'

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

const TextInput = styled.input``

export const StringEditor = ({ node, value, tag }: Jsx<EditorProps<StringValue>>) => {
  const { view, isEditView, editView, displayView } = useView(Views)
  const [error, setError] = useState<Maybe<ZodError>>()

  const nodeSettings = useStore($nodeSettings)

  const attemptSave = (e: KeyboardEvent<HTMLInputElement>) => {
    const nodeSetting = nodeSettings[node.id] as StringSettings
    const validator = getStringValidator(nodeSetting)
    const newValue = e.currentTarget.value
    const result = validator.safeParse(newValue)
    if (result.success) {
      updateValueFx({
        value: newValue,
        nodeId: node.id,
        tag,
        nodeType: NodeType.String
      }).finally(displayView)
    } else {
      setError(result.error)
      e.stopPropagation()
    }
  }

  const keyMap = cond([
    [propEq('key', 'Enter'), ifElse(isEditView, attemptSave, editView)],
    [propEq('key', 'Tab'), when(isEditView, attemptSave)],
    [propEq('code', 'ArrowRight'), when(isEditView, (e: Event) => e.stopPropagation())],
    [propEq('code', 'ArrowLeft'), when(isEditView, (e: Event) => e.stopPropagation())]
  ])

  return view === Views.Display ? (
    <Text tabIndex={0} onKeyDown={keyMap}>
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
