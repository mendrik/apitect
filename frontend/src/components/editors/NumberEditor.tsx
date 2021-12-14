import { IconSquareMinus, IconSquarePlus } from '@tabler/icons'
import clsx from 'clsx'
import { useStoreMap } from 'effector-react'
import { both, cond, pathOr, pipe, when } from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { useEditorTools } from '~hooks/specific/useEditorTools'
import { useNumberFormat } from '~hooks/useNumberFormat'
import { NumberValue } from '~shared/types/domain/values/numberValue'
import { NumberSettings } from '~shared/types/forms/nodetypes/numberSettings'
import { Jsx } from '~shared/types/generic'
import { asNumber } from '~shared/utils/ramda'
import { getNumberValidator } from '~shared/validators/numberValidator'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

import { Palette } from '../../css/colors'
import { codeIn, onlyNumbers, withShift } from '../../utils/eventUtils'
import { preventDefault } from '../../utils/preventDefault'
import { stopPropagation } from '../../utils/stopPropagation'
import { HGrid } from '../generic/HGrid'
import { SimpleIcon } from '../generic/SimpleIcon'
import { EditorProps } from '../specific/VisualValue'

export const NumberInput = styled.input`
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

export const NumberText = styled.div`
  white-space: pre;
  width: 100%;
  height: 24px;
`

export const NumberEditor = ({ value, node, tag }: Jsx<EditorProps<NumberValue>>) => {
  const numberSettings = useStoreMap($nodeSettings, s => s[node.id] as NumberSettings)
  const numberFormat = useNumberFormat(numberSettings)
  const validator = getNumberValidator(numberSettings)
  const { saveValue, error, views } = useEditorTools(node, value, tag, validator)

  const saveAsNumber = pipe(pathOr('', ['target', 'value']), asNumber, saveValue)

  const keyMap = cond([
    [both(withShift, codeIn('ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft')), preventDefault()],
    [codeIn('ArrowRight', 'ArrowLeft'), when(views.isEditView, stopPropagation())],
    [codeIn('Tab', 'Enter'), saveAsNumber],
    [codeIn('Escape'), views.displayView]
  ])

  const asStepper = (children: JSX.Element) =>
    numberSettings?.display.step != null && value?.value != null ? (
      <HGrid className="w-min-c align-items-center gap-2">
        <SimpleIcon icon={IconSquareMinus} />
        {children}
        <SimpleIcon icon={IconSquarePlus} />
      </HGrid>
    ) : (
      children
    )

  return asStepper(
    views.isDisplayView() ? (
      <NumberText tabIndex={0} onKeyDown={keyMap} onFocus={views.editView} className="text-center">
        {numberFormat(value?.value)}
      </NumberText>
    ) : (
      <NumberInput
        type="text"
        className={clsx('editor', { invalid: error != null })}
        style={{ width: 100 }}
        autoFocus
        lang={navigator.language}
        onKeyDown={keyMap}
        onBlur={saveAsNumber}
        defaultValue={value?.value}
      />
    )
  )
}
