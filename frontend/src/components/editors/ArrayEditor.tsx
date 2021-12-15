import { useStoreMap } from 'effector-react'
import React from 'react'
import { Badge } from 'react-bootstrap'
import styled from 'styled-components'
import { ArrayValue } from '~shared/types/domain/values/arrayValue'
import { ArraySettings } from '~shared/types/forms/nodetypes/arraySettings'
import { Jsx } from '~shared/types/generic'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

import { Palette } from '../../css/colors'
import { Scale, Tuple } from '../generic/Tuple'
import { EditorProps } from '../specific/VisualValue'

const BadgeSx = styled.div`
  border-radius: 3px;
  background-color: ${Palette.selected};
  padding: 0px 5px;
  height: 20px;
  font-size: 13px;
`

export const ArrayEditor = ({ value, node, tag }: Jsx<EditorProps<ArrayValue>>) => {
  const arraySettings = useStoreMap($nodeSettings, s => s[node.id] as ArraySettings)
  return (
    <Tuple first={Scale.CONTENT} second={Scale.MAX} style={{ height: 24, paddingLeft: 3 }}>
      <BadgeSx tabIndex={0}>2837</BadgeSx>
      <div />
    </Tuple>
  )
}
