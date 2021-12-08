import clsx from 'clsx'
import { useStore } from 'effector-react'
import { cond, propEq, propSatisfies, when } from 'ramda'
import { included } from 'ramda-adjunct'
import React, { SyntheticEvent, useState } from 'react'
import styled from 'styled-components'
import { ZodError } from 'zod'
import { useView } from '~hooks/useView'
import { NodeType } from '~shared/types/domain/nodeType'
import { getStringValidator, StringValue } from '~shared/types/domain/values/stringValue'
import { StringSettings } from '~shared/types/forms/nodetypes/stringSettings'
import { Jsx, Maybe } from '~shared/types/generic'

import { Palette } from '../../css/colors'
import { valueDeleteFx, valueUpdateFx } from '../../events/values'
import { $nodeSettings } from '../../stores/$nodeSettingsStore'
import { EditorProps } from '../specific/VisualValue'

enum Views {
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

const emptyToUndefined = (str: string) => (/^\s*$/.test(str) ? undefined : str)

const lastExecution = {
  time: Date.now()
}

export const StringEditor = ({ node, value, tag }: Jsx<EditorProps<StringValue>>) => {
  const { isEditView, editView, displayView, isDisplayView } = useView(Views)

  const [error, setError] = useState<Maybe<ZodError>>()
  const nodeSettings = useStore($nodeSettings)
  const nodeSetting = nodeSettings[node.id] as StringSettings
  const validator = getStringValidator(nodeSetting)

  const attemptSave = (e: SyntheticEvent<HTMLInputElement>) => {
    const now = Date.now()
    // make sure that onBlur and onKeyDown don't run this twice
    if (now - lastExecution.time < 20) {
      return
    } else {
      lastExecution.time = now
    }
    setError(undefined)
    const newValue = emptyToUndefined(e.currentTarget.value)
    const result = validator.safeParse(newValue)
    if (value?.value === newValue && result.success) {
      return displayView()
    }
    if (result.success) {
      const params = {
        tag,
        nodeId: node.id,
        nodeType: NodeType.String
      }
      void (
        newValue !== undefined
          ? valueUpdateFx({ ...params, value: newValue } as StringValue)
          : valueDeleteFx(params)
      ).then(displayView)
    } else {
      e.preventDefault()
      e.stopPropagation()
      setError(result.error)
    }
  }

  const keyMap = cond([
    [propEq('code', 'ArrowRight'), when(isEditView, (e: Event) => e.stopPropagation())],
    [propEq('code', 'ArrowLeft'), when(isEditView, (e: Event) => e.stopPropagation())],
    [propSatisfies(included(['ArrowUp', 'ArrowDown', 'Tab']), 'code'), attemptSave]
  ])

  return isDisplayView() ? (
    <Text tabIndex={0} onKeyDown={keyMap} onFocus={editView}>
      <span>{value?.value ?? ' '}</span>
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
