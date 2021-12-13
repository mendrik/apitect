import clsx from 'clsx'
import { useStore, useStoreMap } from 'effector-react'
import { cond, find, propEq, propSatisfies } from 'ramda'
import { included } from 'ramda-adjunct'
import React, { KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Text, useEditorTools } from '~hooks/specific/useEditorTools'
import { Enum } from '~shared/types/domain/enums'
import { EnumValue } from '~shared/types/domain/values/enums'
import { EnumSettings } from '~shared/types/forms/nodetypes/enumSettings'
import { Jsx } from '~shared/types/generic'
import { getEnumValidator } from '~shared/validators/enumValidator'
import { $enumsStore } from '~stores/$enumsStore'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

import { Palette } from '../../css/colors'
import { EditorProps } from '../specific/VisualValue'

const SelectSx = styled.select`
  margin-left: -2px;
  &.invalid {
    background-color: ${Palette.error};
  }
`

export const EnumEditor = ({ node, value, tag }: Jsx<EditorProps<EnumValue>>) => {
  const { t } = useTranslation()
  const enumSettings = useStoreMap($nodeSettings, s => s[node.id] as EnumSettings)
  const enums = useStore($enumsStore)
  const e = find<Enum>(propEq('name', enumSettings?.enumeration), enums)

  const validator = getEnumValidator(e, enumSettings)
  const { saveFromEvent, error, keyMap, views, setError } = useEditorTools(
    node,
    value,
    tag,
    validator
  )

  const selKeyMap = cond([
    [propSatisfies(included(['Escape']), 'code'), views.displayView],
    [
      propSatisfies(included(['ArrowUp', 'ArrowDown', 'Enter', 'Space', 'Escape']), 'code'),
      (e: KeyboardEvent<HTMLSelectElement>) => e.stopPropagation()
    ]
  ])

  return !e || views.isDisplayView() ? (
    <Text tabIndex={0} onFocus={views.editView} onKeyDown={keyMap}>
      <span>{value?.value ?? ' '}</span>
    </Text>
  ) : (
    <SelectSx
      className={clsx('editor', { invalid: error != null })}
      autoFocus
      defaultValue={value?.value}
      onBlur={saveFromEvent}
      onKeyDown={selKeyMap}
      onChange={() => setError(undefined)}
    >
      {!enumSettings.required && <option value="">{t('common.select')}</option>}
      {e.values.map(v => (
        <option key={v.value} value={v.value}>
          {v.value}
        </option>
      ))}
    </SelectSx>
  )
}
