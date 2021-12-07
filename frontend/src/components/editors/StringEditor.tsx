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

const emptyToUndefined = (str: string) => (/^\s*$/.test(str) ? undefined : str)

export const StringEditor = ({ node, value, tag }: Jsx<EditorProps<StringValue>>) => {
  const { view, isEditView, editView, displayView } = useView(Views)

  const [error, setError] = useState<Maybe<ZodError>>()
  const nodeSettings = useStore($nodeSettings)
  const nodeSetting = nodeSettings[node.id] as StringSettings
  const validator = getStringValidator(nodeSetting)

  const attemptSave = (e: SyntheticEvent<HTMLInputElement>) => {
    const newValue = emptyToUndefined(e.currentTarget.value)
    if (value?.value === newValue) {
      return displayView()
    }
    const result = validator.safeParse(newValue)
    if (result.success) {
      setError(undefined)
      const params = {
        tag,
        nodeId: node.id,
        nodeType: NodeType.String
      }
      void (
        newValue === undefined
          ? valueDeleteFx(params)
          : valueUpdateFx({ ...params, value: newValue } as StringValue)
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

  return view === Views.Display ? (
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
