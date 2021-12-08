import clsx from 'clsx'
import { useStore } from 'effector-react'
import React from 'react'
import { useEditorTools, Text, TextInput } from '~hooks/specific/useEditorTools'
import { StringValue } from '~shared/types/domain/values/stringValue'
import { StringSettings } from '~shared/types/forms/nodetypes/stringSettings'
import { Jsx } from '~shared/types/generic'
import { getStringValidator } from '~shared/validators/stringValidator'

import { $nodeSettings } from '../../stores/$nodeSettingsStore'
import { EditorProps } from '../specific/VisualValue'

export const StringEditor = ({ node, value, tag }: Jsx<EditorProps<StringValue>>) => {
  const nodeSettings = useStore($nodeSettings)
  const validator = getStringValidator(nodeSettings[node.id] as StringSettings)
  const { saveFromEvent, error, keyMap, views } = useEditorTools(node, value, tag, validator)

  return views.isDisplayView() ? (
    <Text tabIndex={0} onKeyDown={keyMap} onFocus={views.editView}>
      <span>{value?.value ?? ' '}</span>
    </Text>
  ) : (
    <TextInput
      type="text"
      className={clsx('editor', { invalid: error != null })}
      autoFocus
      placeholder={node.name}
      onKeyDown={keyMap}
      onBlur={saveFromEvent}
      defaultValue={value?.value}
    />
  )
}
