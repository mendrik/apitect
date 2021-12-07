import clsx from 'clsx'
import { useStore } from 'effector-react'
import { cond, propEq, propSatisfies, when } from 'ramda'
import { included } from 'ramda-adjunct'
import React, { FocusEvent, KeyboardEvent, useRef, useState } from 'react'
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
import { stopPropagation } from '../../utils/stopPropagation'
import { EditorProps } from '../specific/VisualValue'

export enum Views {
  Display,
  Edit
}

const Text = styled.div`
  width: 100%;
  height: 24px;
  padding-left: 3px;
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
  const nodeSetting = nodeSettings[node.id] as StringSettings
  const validator = getStringValidator(nodeSetting)

  const attemptSave = (e: FocusEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    if (value?.value === newValue) {
      return displayView()
    }
    const result = validator.safeParse(newValue)
    if (result.success) {
      void updateValueFx({
        value: newValue,
        nodeId: node.id,
        tag,
        nodeType: NodeType.String
      })
        .then(() => setError(undefined))
        .then(displayView)
    } else {
      e.stopPropagation()
      setError(result.error)
    }
  }

  const keyMap = cond([
    [propEq('code', 'ArrowRight'), when(isEditView, (e: Event) => e.stopPropagation())],
    [propEq('code', 'ArrowLeft'), when(isEditView, (e: Event) => e.stopPropagation())],
    [
      propSatisfies(included(['ArrowUp', 'ArrowDown', 'Tab']), 'code'),
      (ev: KeyboardEvent<HTMLInputElement>) => {
        const res = validator.safeParse(ev.currentTarget.value)
        if (!res.success) {
          stopPropagation()(ev)
          setError(res.error)
        }
      }
    ]
  ])

  return view === Views.Display ? (
    <Text tabIndex={0} onKeyDown={keyMap} ref={ref} onFocus={editView}>
      {value?.value}
    </Text>
  ) : (
    <TextInput
      type="text"
      className={clsx('editor', { invalid: error != null })}
      autoFocus
      placeholder={node.name}
      onKeyDown={keyMap}
      onBlur={attemptSave}
      defaultValue={value?.value}
    />
  )
}
