import clsx from 'clsx'
import { useStore } from 'effector-react'
import { cond, propEq, propSatisfies, when } from 'ramda'
import { included } from 'ramda-adjunct'
import React, { useState } from 'react'
import { ZodError } from 'zod'
import { TextInput } from '~forms/TextInput'
import { useView } from '~hooks/useView'
import { DateValue, getDateValidator } from '~shared/types/domain/values/dateValue'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'
import { Jsx, Maybe } from '~shared/types/generic'

import { $nodeSettings } from '../../stores/$nodeSettingsStore'
import { EditorProps } from '../specific/VisualValue'
import { useSafeAttempt } from './safeFunction'
import { format } from 'prettier'

enum Views {
  Display,
  Edit
}

export const DateEditor = ({ value, node, tag, loading }: Jsx<EditorProps<DateValue>>) => {
  const { isEditView, editView, displayView, isDisplayView } = useView(Views)

  const [error] = useState<Maybe<ZodError>>()
  const nodeSettings = useStore($nodeSettings)
  const nodeSetting = nodeSettings[node.id] as DateSettings
  const validator = getDateValidator(nodeSetting)
  const attemptSave = useSafeAttempt(node, value, tag, validator, displayView)

  const keyMap = cond([
    [propEq('code', 'ArrowRight'), when(isEditView, (e: Event) => e.stopPropagation())],
    [propEq('code', 'ArrowLeft'), when(isEditView, (e: Event) => e.stopPropagation())],
    [propSatisfies(included(['ArrowUp', 'ArrowDown', 'Tab']), 'code'), attemptSave]
  ])

  return isDisplayView() ? (
    <Text tabIndex={0} onKeyDown={keyMap} onFocus={editView}>
      {value?.value ? <span>{format(value?.value, nodeSetting.}</span>
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
