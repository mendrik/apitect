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
import { ConditionalWrapper } from '../generic/ConditionalWrapper'
import { HGrid } from '../generic/HGrid'
import { SimpleIcon } from '../generic/SimpleIcon'
import { EditorProps } from '../specific/value/VisualValue'

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
    content: '\u00A0';
  }
`

export const NumberEditor = ({ value, node, tag }: EditorProps<NumberValue>) => {
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
  const val = value?.value

  const asStepper = ({ children }: Jsx) => (
    <HGrid className="w-min-c align-items-center gap-2 text-center">
      <SimpleIcon icon={IconSquareMinus} onClick={() => saveValue((val ?? 0) - step)} />
      {children}
      <SimpleIcon icon={IconSquarePlus} onClick={() => saveValue((val ?? 0) + step)} />
    </HGrid>
  )

  const unit = numberSettings?.display.unit
  const hasSteps = Boolean(numberSettings?.display.step && val)
  return (
    <ConditionalWrapper condition={hasSteps} wrapper={asStepper}>
      {views.isDisplayView() ? (
        <NumberText tabIndex={0} onFocus={views.editView} style={{ paddingLeft: hasSteps ? 0 : 3 }}>
          {val && (
            <>
              {numberFormat(val)}
              {unit && <UnitSx>{unit}</UnitSx>}
            </>
          )}
        </NumberText>
      ) : (
        <Autogrow initial={val}>
          <NumberInput
            type="text"
            className={clsx('editor', { invalid: error != null })}
            autoFocus
            onPaste={onlyNumbersPaste}
            lang={navigator.language}
            onKeyDown={keyMap}
            onBlur={saveAsNumber}
            defaultValue={val}
          />
        </Autogrow>
      )}
    </ConditionalWrapper>
  )
}
