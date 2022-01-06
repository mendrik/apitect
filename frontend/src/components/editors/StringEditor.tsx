import clsx from 'clsx'
import { useStoreMap } from 'effector-react'
import { cond } from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { Text, useEditorTools } from '~hooks/specific/useEditorTools'
import { StringValue } from '~shared/types/domain/values/stringValue'
import { StringSettings, StringValidationType } from '~shared/types/forms/nodetypes/stringSettings'
import { Jsx } from '~shared/types/generic'
import { getStringValidator } from '~shared/validators/stringValidator'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

import { Palette } from '../../css/colors'
import { codeIn } from '../../utils/eventUtils'
import { EditorProps } from '../specific/VisualValue'

export const TextInput = styled.input`
  &.invalid {
    background-color: ${Palette.error};
  }
`

export const StringEditor = ({ node, value, tag }: Jsx<EditorProps<StringValue>>) => {
  const stringSettings = useStoreMap($nodeSettings, s => s[node.id] as StringSettings)
  const validator = getStringValidator(stringSettings)
  const { saveFromEvent, error, views } = useEditorTools(node, value, tag, validator)

  const keyMap = cond([
    [codeIn('Tab', 'Enter'), saveFromEvent],
    [codeIn('Escape'), views.displayView]
  ])

  return views.isDisplayView() ? (
    <Text tabIndex={0} onFocus={views.editView}>
      {stringSettings?.validationType === StringValidationType.Password && value?.value != null
        ? '*****'
        : value?.value ?? ''}
    </Text>
  ) : (
    <TextInput
      type="text"
      className={clsx('editor', { invalid: error != null })}
      autoFocus
      onKeyDown={keyMap}
      onBlur={saveFromEvent}
      defaultValue={value?.value}
    />
  )
}
