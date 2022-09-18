import { IconSquareMinus, IconSquarePlus } from '@tabler/icons'
import clsx from 'clsx'
import { cond, pipe, T } from 'ramda'
import styled from 'styled-components'
import { useEditorTools } from '~hooks/specific/useEditorTools'
import { useNumberFormat } from '~hooks/useNumberFormat'
import { useStoreMap } from '~hooks/useStoreMap'
import { NumberValue } from '~shared/types/domain/values/numberValue'
import { NumberSettings } from '~shared/types/forms/nodetypes/numberSettings'
import { Jsx } from '~shared/types/generic'
import { asNumber } from '~shared/utils/ramda'
import { getNumberValidator } from '~shared/validators/numberValidator'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

import { Palette } from '../../css/colors'
import { codeIn, onlyNumbers, onlyNumbersPaste, target } from '../../utils/eventUtils'
import { Autogrow } from '../generic/Autogrow'
import { HGrid } from '../generic/HGrid'
import { SimpleIcon } from '../generic/SimpleIcon'
import { EditorProps } from '../specific/VisualValue'

export const NumberInput = styled.input`
  margin-left: -3px;
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

const UnitSx = styled.span`
  color: ${Palette.darkBorder};
  &:before {
    content: '\u202F';
  }
`

const Wrap = styled.div`
  padding-left: 3px;
`

export const NumberEditor = ({ value, node, tag }: Jsx<EditorProps<NumberValue>>) => {
  const numberSettings = useStoreMap($nodeSettings, s => s[node.id] as NumberSettings)
  const numberFormat = useNumberFormat(numberSettings)
  const validator = getNumberValidator(numberSettings)
  const { saveValue, error, views } = useEditorTools(node, value, tag, validator)

  const saveAsNumber = pipe(target.value, asNumber, saveValue)

  const keyMap = cond([
    [codeIn('Tab', 'Enter'), saveAsNumber],
    [codeIn('Escape'), views.displayView],
    [T, onlyNumbers]
  ])

  const step = numberSettings?.display.step ?? 1
  const asStepper = (children: JSX.Element) =>
    numberSettings?.display.step != null && value?.value != null ? (
      <HGrid className="w-min-c align-items-center gap-2 text-center">
        <SimpleIcon icon={IconSquareMinus} onClick={() => saveValue((value?.value ?? 0) - step)} />
        {children}
        <SimpleIcon icon={IconSquarePlus} onClick={() => saveValue((value?.value ?? 0) + step)} />
      </HGrid>
    ) : (
      <Wrap>{children}</Wrap>
    )

  const unit = numberSettings?.display.unit
  return asStepper(
    views.isDisplayView() ? (
      <NumberText tabIndex={0} onKeyDown={keyMap} onFocus={views.editView}>
        {numberFormat(value?.value)}
        {value?.value && unit && <UnitSx>{unit}</UnitSx>}
      </NumberText>
    ) : (
      <Autogrow initial={value?.value}>
        <NumberInput
          type="text"
          className={clsx('editor', { invalid: error != null })}
          autoFocus
          onPaste={onlyNumbersPaste}
          lang={navigator.language}
          onKeyDown={keyMap}
          onBlur={saveAsNumber}
          defaultValue={value?.value}
        />
      </Autogrow>
    )
  )
}
