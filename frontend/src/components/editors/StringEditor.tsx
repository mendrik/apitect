import clsx from 'clsx'
import { useStore } from 'effector-react'
import { cond, propEq, propSatisfies, when } from 'ramda'
import { included } from 'ramda-adjunct'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ZodError } from 'zod'
import { useView } from '~hooks/useView'
import { getStringValidator, StringValue } from '~shared/types/domain/values/stringValue'
import { StringSettings } from '~shared/types/forms/nodetypes/stringSettings'
import { Jsx, Maybe } from '~shared/types/generic'

import { Palette } from '../../css/colors'
import { $nodeSettings } from '../../stores/$nodeSettingsStore'
import { EditorProps } from '../specific/VisualValue'
import { useSafeAttempt } from './safeFunction'

enum Views {
  Display,
  Edit
}

const Text = styled.div`
  white-space: pre;
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
  const { isEditView, editView, displayView, isDisplayView } = useView(Views)

  const [error] = useState<Maybe<ZodError>>()
  const nodeSettings = useStore($nodeSettings)
  const validator = getStringValidator(nodeSettings[node.id] as StringSettings)
  const attemptSave = useSafeAttempt(node, value, tag, validator, displayView)

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
