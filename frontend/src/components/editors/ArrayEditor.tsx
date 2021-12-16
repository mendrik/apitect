import { IconSearch } from '@tabler/icons'
import { useStore, useStoreMap } from 'effector-react'
import { cond } from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { ArrayValue } from '~shared/types/domain/values/arrayValue'
import { ArraySettings } from '~shared/types/forms/nodetypes/arraySettings'
import { Jsx } from '~shared/types/generic'
import { $arrayDrawer } from '~stores/$arrayDrawer'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

import { Palette } from '../../css/colors'
import { closeArrayDrawer, openArrayDrawer } from '../../events/array'
import { codeIn } from '../../utils/eventUtils'
import { HGrid } from '../generic/HGrid'
import { SimpleIcon } from '../generic/SimpleIcon'
import { EditorProps } from '../specific/VisualValue'

const BadgeSx = styled.div`
  border-radius: 3px;
  background-color: ${Palette.selected};
  padding: 0px 5px;
  height: 20px;
  font-size: 13px;
  width: min-content;
  white-space: nowrap;
`

export const ArrayEditor = ({ value, node, tag }: Jsx<EditorProps<ArrayValue>>) => {
  const arraySettings = useStoreMap($nodeSettings, s => s[node.id] as ArraySettings)
  const open = useStore($arrayDrawer)
  const toggle = () => (open ? closeArrayDrawer() : openArrayDrawer(arraySettings))
  const keyMap = cond([[codeIn('Enter'), toggle]])

  return (
    <div style={{ height: 24, padding: 2 }} tabIndex={0} onKeyDown={keyMap}>
      <HGrid className="w-min-c gap-1">
        <BadgeSx>{value?.value ?? '0'} items</BadgeSx>
        <SimpleIcon icon={IconSearch} onClick={toggle} />
      </HGrid>
    </div>
  )
}
