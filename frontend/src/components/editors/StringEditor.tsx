import clsx from 'clsx'
import { always, cond, identity, pipe, T } from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { Text, useEditorTools } from '~hooks/useEditorTools'
import { useStoreMap } from '~hooks/useStoreMap'
import { StringValue } from '~shared/types/domain/values/stringValue'
import { StringSettings, StringValidationType } from '~shared/types/forms/nodetypes/stringSettings'
import { Maybe } from '~shared/types/generic'
import { getStringValidator } from '~shared/validators/stringValidator'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

import { Palette } from '../../css/colors'
import { codeIn, target } from '../../utils/eventUtils'
import { EditorProps } from '../specific/value/VisualValue'

export const TextInput = styled.input`
  &.invalid {
    background-color: ${Palette.error};
  }
`

export const StringEditor = ({ node, value, tag }: EditorProps<StringValue>) => {
  const stringSettings = useStoreMap($nodeSettings, s => s[node.id] as StringSettings)
  const type = stringSettings?.validationType
  const validator = getStringValidator(stringSettings)
  const { saveValue, error, views, onChange } = useEditorTools(node, value, tag, validator)

  const saveFromEvent = pipe(target.value, saveValue)

  const keyMap = cond([
    [codeIn('Tab', 'Enter'), saveFromEvent],
    [codeIn('Escape'), views.displayView]
  ])

  const textValue = cond<[Maybe<string>], ReactNode>([
    [isNilOrEmpty, always(null)],
    [always(type === StringValidationType.Password), always('*****')],
    [T, identity]
  ])

  return views.isDisplayView() ? (
    <Text tabIndex={0} onFocus={views.editView}>
      {textValue(value?.value)}
    </Text>
  ) : (
    <TextInput
      type="text"
      className={clsx('editor', { invalid: error != null })}
      autoFocus
      onBlur={saveFromEvent}
      onKeyDown={keyMap}
      onChange={onChange}
      defaultValue={value?.value}
    />
  )
}
