import clsx from 'clsx'
import { format } from 'date-fns'
import { useStoreMap } from 'effector-react'
import { cond, pathOr, pipe, propEq, propSatisfies, when } from 'ramda'
import { included } from 'ramda-adjunct'
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
    [propEq('code', 'ArrowRight'), when(views.isEditView, (e: Event) => e.stopPropagation())],
    [propEq('code', 'ArrowLeft'), when(views.isEditView, (e: Event) => e.stopPropagation())],
    [propSatisfies(included(['ArrowUp', 'ArrowDown']), 'code'), (e: Event) => e.stopPropagation()],
    [propSatisfies(included(['Tab', 'Enter']), 'code'), saveAsDate],
    [propSatisfies(included(['Escape']), 'code'), views.displayView]
  ])

  return views.isDisplayView() ? (
    <div className="d-inline-flex align-items-center gap-2">
      <Text tabIndex={0} onKeyDown={keyMap} onFocus={views.editView} style={{ minWidth: 82 }}>
        <span>{userFormat(value?.value)}</span>
      </Text>
      {value?.value && (
        <Datepicker
          onDateSelected={saveValue}
          stroke={1}
          currentDate={value?.value ?? new Date()}
        />
      )}
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
      <Datepicker onDateSelected={saveValue} stroke={1} currentDate={value?.value ?? new Date()} />
    </StyledTuple>
  )
}
