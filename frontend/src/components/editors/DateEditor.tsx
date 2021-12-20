import clsx from 'clsx'
import { format } from 'date-fns'
import { useStoreMap } from 'effector-react'
import { cond, equals, pipe, unless } from 'ramda'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { Text, useEditorTools } from '~hooks/specific/useEditorTools'
import { useDateFormat } from '~hooks/useDateFormat'
import { DateValue } from '~shared/types/domain/values/dateValue'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'
import { Jsx } from '~shared/types/generic'
import { getDateValidator } from '~shared/validators/dateValidator'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

import { Palette } from '../../css/colors'
import { codeIn, target } from '../../utils/eventUtils'
import { StyledTuple } from '../generic/Tuple'
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
  const dateSettings = useStoreMap($nodeSettings, s => s[node.id] as DateSettings)
  const userFormat = useDateFormat(dateSettings)
  const validator = getDateValidator(dateSettings)
  const ref = useRef<HTMLDivElement | null>(null)
  const { saveValue, error, views } = useEditorTools(node, value, tag, validator)

  const oldValue = value?.value ? format(value?.value, 'yyyy-MM-dd') : ''
  const saveAsDate = pipe(target.value, unless(equals(oldValue), saveValue))

  const keyMap = cond([
    [codeIn('Tab', 'Enter'), saveAsDate],
    [codeIn('Escape'), views.displayView]
  ])

  return views.isDisplayView() ? (
    <Text
      tabIndex={0}
      onKeyDown={keyMap}
      onFocus={views.editView}
      className="d-inline-flex align-items-center gap-2"
      style={{ minWidth: 100 }}
    >
      {userFormat(value?.value)}
    </Text>
  ) : (
    <StyledTuple
      ref={ref}
      className="first-max second-content d-inline-flex justify-content-between gap-1 flex-row"
      style={{ position: 'relative', maxWidth: 115 }}
    >
      <DateInput
        type="date"
        className={clsx('editor', { invalid: error != null })}
        autoFocus
        onKeyDown={keyMap}
        onBlur={saveAsDate}
        defaultValue={value?.value ? format(value?.value, 'yyyy-MM-dd') : undefined}
      />
    </StyledTuple>
  )
}
