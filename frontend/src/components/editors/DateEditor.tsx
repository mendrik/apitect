import clsx from 'clsx'
import { format } from 'date-fns'
import { useStore } from 'effector-react'
import React from 'react'
import styled from 'styled-components'
import { Text, useEditorTools } from '~hooks/specific/useEditorTools'
import { useDateFormat } from '~hooks/useDateFormat'
import { DateValue } from '~shared/types/domain/values/dateValue'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'
import { Jsx } from '~shared/types/generic'
import { getDateValidator } from '~shared/validators/dateValidator'

import { Palette } from '../../css/colors'
import { $nodeSettings } from '../../stores/$nodeSettingsStore'
import { Datepicker } from '../datepicker/Datepicker'
import { Scale, Tuple } from '../generic/Tuple'
import { EditorProps } from '../specific/VisualValue'

export const DateInput = styled.input`
  padding-left: 3px;
  border: none;
  outline: none;
  ::-webkit-inner-spin-button,
  ::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  &.invalid {
    background-color: ${Palette.error};
  }
`

export const DateEditor = ({ value, node, tag }: Jsx<EditorProps<DateValue>>) => {
  const nodeSettings = useStore($nodeSettings)
  const nodeSetting = nodeSettings[node.id] as DateSettings
  const userFormat = useDateFormat(nodeSetting)

  const validator = getDateValidator(nodeSetting)
  const { saveValue, error, keyMap, views } = useEditorTools(node, value, tag, validator)

  return views.isDisplayView() ? (
    <Text tabIndex={0} onKeyDown={keyMap} onFocus={views.editView}>
      <span>{userFormat(value?.value)}</span>
    </Text>
  ) : (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} style={{ position: 'relative', maxWidth: 112 }}>
      <DateInput
        type="date"
        className={clsx('editor', { invalid: error != null })}
        autoFocus
        onKeyDown={keyMap}
        value={value?.value ? format(value?.value, 'yyyy-MM-dd') : undefined}
      />
      <Datepicker onDateSelected={saveValue} currentDate={value?.value ?? new Date()} />
    </Tuple>
  )
}
