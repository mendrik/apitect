import clsx from 'clsx'
import { useStoreMap } from 'effector-react'
import { cond, pathOr, pipe, propEq, propSatisfies, when } from 'ramda'
import { included } from 'ramda-adjunct'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { Text, useEditorTools } from '~hooks/specific/useEditorTools'
import { useNumberFormat } from '~hooks/useNumberFormat'
import { NumberValue } from '~shared/types/domain/values/numberValue'
import { NumberSettings } from '~shared/types/forms/nodetypes/numberSettings'
import { Jsx } from '~shared/types/generic'
import { asNumber } from '~shared/utils/ramda'
import { getNumberValidator } from '~shared/validators/numberValidator'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

import { Palette } from '../../css/colors'
import { StyledTuple } from '../generic/Tuple'
import { EditorProps } from '../specific/VisualValue'

export const NumberInput = styled.input`
  padding-left: 3px;
  border: none;
  outline: none;
  ::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
  }

  &.invalid {
    background-color: ${Palette.error};
  }
`

export const NumberEditor = ({ value, node, tag }: Jsx<EditorProps<NumberValue>>) => {
  const numberSettings = useStoreMap($nodeSettings, s => s[node.id] as NumberSettings)
  const numberFormat = useNumberFormat(numberSettings)
  const validator = getNumberValidator(numberSettings)
  const ref = useRef<HTMLDivElement | null>(null)
  const { saveValue, error, views } = useEditorTools(node, value, tag, validator)

  const saveAsNumber = pipe(pathOr('', ['target', 'value']), asNumber, saveValue)

  const keyMap = cond([
    [propEq('code', 'ArrowRight'), when(views.isEditView, (e: Event) => e.stopPropagation())],
    [propEq('code', 'ArrowLeft'), when(views.isEditView, (e: Event) => e.stopPropagation())],
    [propSatisfies(included(['Tab', 'Enter']), 'code'), saveAsNumber],
    [propSatisfies(included(['Escape']), 'code'), views.displayView]
  ])

  return views.isDisplayView() ? (
    <div className="d-inline-flex align-items-center gap-2">
      <Text tabIndex={0} onKeyDown={keyMap} onFocus={views.editView} style={{ minWidth: 82 }}>
        {numberFormat(value?.value)}
      </Text>
      {value?.value && 'Up / Down'}
    </div>
  ) : (
    <StyledTuple
      ref={ref}
      className="first-max second-content d-inline-flex justify-content-between gap-1 flex-row"
      style={{ position: 'relative', maxWidth: 112 }}
    >
      <NumberInput
        type="number"
        className={clsx('editor', { invalid: error != null })}
        autoFocus
        onKeyDown={keyMap}
        defaultValue={value?.value}
      />
      {value?.value && 'Up / Down'}
    </StyledTuple>
  )
}
