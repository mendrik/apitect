import clsx from 'clsx'
import { useStore } from 'effector-react'
import React from 'react'
import InputMask from 'react-input-mask'
import styled from 'styled-components'
import { Text, useEditorTools } from '~hooks/specific/useEditorTools'
import { useDateFormat } from '~hooks/useDateFormat'
import { DateValue, getDateValidator } from '~shared/types/domain/values/dateValue'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'
import { Jsx } from '~shared/types/generic'

import { Palette } from '../../css/colors'
import { $nodeSettings } from '../../stores/$nodeSettingsStore'
import { Datepicker } from '../datepicker/Datepicker'
import { Scale, Tuple } from '../generic/Tuple'
import { EditorProps } from '../specific/VisualValue'

export const DateInput = styled(InputMask)`
  &.invalid {
    background-color: ${Palette.error};
  }
`

export const DateEditor = ({ value, node, tag }: Jsx<EditorProps<DateValue>>) => {
  const nodeSettings = useStore($nodeSettings)
  const nodeSetting = nodeSettings[node.id] as DateSettings
  const validator = getDateValidator(nodeSetting)
  const format = useDateFormat(nodeSetting)
  const { saveFromEvent, saveValue, error, keyMap, views } = useEditorTools(
    node,
    value,
    tag,
    validator
  )

  return views.isDisplayView() ? (
    <Text tabIndex={0} onKeyDown={keyMap} onFocus={views.editView}>
      <span>{format(value?.value)}</span>
    </Text>
  ) : (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} style={{ position: 'relative', maxWidth: 200 }}>
      <InputMask
        mask="99.99.9999"
        className={clsx('editor', { invalid: error != null })}
        autoFocus
        onKeyDown={keyMap}
        onBlur={saveFromEvent}
      />
      <Datepicker name="date" onDateSelected={saveValue} currentDate={value?.value ?? new Date()} />
    </Tuple>
  )
}
