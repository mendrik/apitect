import clsx from 'clsx'
import { useStore } from 'effector-react'
import { cond, find, pipe, propEq } from 'ramda'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Text, useEditorTools } from '~hooks/useEditorTools'
import { useStoreMap } from '~hooks/useStoreMap'
import { Enum } from '~shared/types/domain/enums'
import { EnumValue } from '~shared/types/domain/values/enums'
import { EnumSettings } from '~shared/types/forms/nodetypes/enumSettings'
import { getEnumValidator } from '~shared/validators/enumValidator'
import { $enumsStore } from '~stores/$enumsStore'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

import { Palette } from '../../css/colors'
import { codeIn, target } from '../../utils/eventUtils'
import { stopPropagation } from '../../utils/events'
import { EditorProps } from '../specific/value/VisualValue'

const SelectSx = styled.select`
  margin-left: -2px;
  &.invalid {
    background-color: ${Palette.error};
  }
`

const OptionSx = styled.option`
  font-weight: 300;
`

export const EnumEditor = ({ node, value, tag }: EditorProps<EnumValue>) => {
  const { t } = useTranslation()
  const enumSettings = useStoreMap($nodeSettings, s => s[node.id] as EnumSettings)
  const enums = useStore($enumsStore)
  const e = find<Enum>(propEq('name', enumSettings?.enumeration), enums)

  const validator = getEnumValidator(e, enumSettings)
  const { saveValue, error, views, onChange } = useEditorTools(node, value, tag, validator)

  const selKeyMap = cond([
    [codeIn('Enter', 'Space'), stopPropagation],
    [codeIn('Escape'), pipe(stopPropagation, views.displayView)]
  ])

  return !e || views.isDisplayView() ? (
    <Text tabIndex={0} onFocus={views.editView} style={{ paddingLeft: 3 }}>
      {value?.value ?? ' '}
    </Text>
  ) : (
    <SelectSx
      className={clsx('editor', { invalid: error != null })}
      autoFocus
      defaultValue={value?.value}
      onBlur={pipe(target.value, saveValue)}
      onKeyDown={selKeyMap}
      onChange={onChange}
    >
      {!enumSettings.required && <OptionSx value="">{t('common.select')}</OptionSx>}
      {e.values.map(v => (
        <OptionSx key={v.value} value={v.value}>
          {v.value}
        </OptionSx>
      ))}
    </SelectSx>
  )
}
