import { IconCircleMinus, IconCirclePlus } from '@tabler/icons'
import clsx from 'clsx'
import { useStoreMap } from 'effector-react'
import { cond, pathOr, pipe, propEq, propSatisfies, when } from 'ramda'
import { included } from 'ramda-adjunct'
import React, { useRef } from 'react'
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
import { HGrid } from '../generic/HGrid'
import { SimpleIcon } from '../generic/SimpleIcon'
import { StyledTuple } from '../generic/Tuple'
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
  const ref = useRef<HTMLDivElement | null>(null)
  const { saveValue, error, views } = useEditorTools(node, value, tag, validator)

  const saveAsNumber = pipe(pathOr('', ['target', 'value']), asNumber, saveValue)

  const keyMap = cond([
    [propEq('code', 'ArrowRight'), when(views.isEditView, (e: Event) => e.stopPropagation())],
    [propEq('code', 'ArrowLeft'), when(views.isEditView, (e: Event) => e.stopPropagation())],
    [propSatisfies(included(['Tab', 'Enter']), 'code'), saveAsNumber],
    [propSatisfies(included(['Escape']), 'code'), views.displayView]
  ])

  const asStepper = (children: JSX.Element) =>
    numberSettings?.display.step != null ? (
      <HGrid className="w-min-c align-items-center">
        <SimpleIcon icon={IconCircleMinus} />
        {children}
        <SimpleIcon icon={IconCirclePlus} />
      </HGrid>
    ) : (
      children
    )

  return views.isDisplayView() ? (
    asStepper(
      <NumberText
        tabIndex={0}
        onKeyDown={keyMap}
        onFocus={views.editView}
        className="text-center px-2"
      >
        {numberFormat(value?.value)}
      </NumberText>
    )
  ) : (
    <StyledTuple
      ref={ref}
      className="first-max second-content d-inline-flex justify-content-between gap-1 flex-row"
    >
      {asStepper(
        <NumberInput
          type="number"
          className={clsx('editor', { invalid: error != null })}
          autoFocus
          onKeyDown={keyMap}
          onBlur={saveAsNumber}
          defaultValue={value?.value}
        />
      )}
    </StyledTuple>
  )
}
