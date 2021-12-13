import clsx from 'clsx'
import { format } from 'date-fns'
import { useStoreMap } from 'effector-react'
import { cond, pathOr, pipe, when } from 'ramda'
import React, { useRef } from 'react'
import { useClickAway } from 'react-use'
import styled from 'styled-components'
import { Text, useEditorTools } from '~hooks/specific/useEditorTools'
import { useDateFormat } from '~hooks/useDateFormat'
import { DateValue } from '~shared/types/domain/values/dateValue'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'
import { Jsx } from '~shared/types/generic'
import { getDateValidator } from '~shared/validators/dateValidator'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

import { Palette } from '../../css/colors'
import { codeIs } from '../../utils/eventUtils'
import { stopPropagation } from '../../utils/stopPropagation'
import { Datepicker } from '../datepicker/Datepicker'
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

  const saveAsDate = pipe(pathOr('', ['target', 'value']), saveValue)
  useClickAway(ref, e => {
    const input = ref.current?.firstElementChild as HTMLInputElement | null
    saveValue(input?.value)
  })

  const keyMap = cond([
    [codeIs('ArrowRight', 'ArrowLeft'), when(views.isEditView, stopPropagation)],
    [codeIs('ArrowUp', 'ArrowDown'), stopPropagation],
    [codeIs('Tab', 'Enter'), saveAsDate],
    [codeIs('Escape'), views.displayView]
  ])

  const datepicker = (
    <Datepicker
      onDateSelected={saveValue}
      stroke={0.5}
      color={Palette.iconBorder.toString()}
      currentDate={value?.value ?? new Date()}
    />
  )

  return views.isDisplayView() ? (
    <div className="d-inline-flex align-items-center gap-2">
      <Text tabIndex={0} onKeyDown={keyMap} onFocus={views.editView} style={{ minWidth: 82 }}>
        {userFormat(value?.value)}
      </Text>
      {value?.value && datepicker}
    </div>
  ) : (
    <StyledTuple
      ref={ref}
      className="first-max second-content d-inline-flex justify-content-between gap-1 flex-row"
      style={{ position: 'relative', maxWidth: 112 }}
    >
      <DateInput
        type="date"
        className={clsx('editor', { invalid: error != null })}
        autoFocus
        onKeyDown={keyMap}
        defaultValue={value?.value ? format(value?.value, 'yyyy-MM-dd') : undefined}
      />
      {datepicker}
    </StyledTuple>
  )
}
