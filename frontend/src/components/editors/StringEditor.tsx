import clsx from 'clsx'
import { always, cond, equals, T } from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { Text, useEditorTools } from '~hooks/specific/useEditorTools'
import { useStoreMap } from '~hooks/useStoreMap'
import { StringValue } from '~shared/types/domain/values/stringValue'
import { StringSettings, StringValidationType } from '~shared/types/forms/nodetypes/stringSettings'
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

export const StringEditor = ({ node, value, tag }: EditorProps<StringValue>) => {
  const stringSettings = useStoreMap($nodeSettings, s => s[node.id] as StringSettings)
  const validator = getStringValidator(stringSettings)
  const { saveFromEvent, error, views } = useEditorTools(node, value, tag, validator)

  const keyMap = cond([
    [codeIn('Tab', 'Enter'), saveFromEvent],
    [codeIn('Escape'), views.displayView]
  ])

  const textValue = (
    type: StringValidationType | undefined,
    value: string | undefined
  ): ReactNode =>
    cond<any, ReactNode>([
      [always(isNilOrEmpty(value)), () => null],
      [equals(StringValidationType.Password), always('*****')],
      [equals(StringValidationType.Email), always(value)],
      [T, always(value)]
    ])(type)

  return views.isDisplayView() ? (
    <Text tabIndex={0} onFocus={views.editView}>
      {textValue(stringSettings?.validationType, value?.value)}
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
