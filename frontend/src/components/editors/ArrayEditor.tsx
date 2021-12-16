import React from 'react'
import styled from 'styled-components'
import { ArrayValue } from '~shared/types/domain/values/arrayValue'
import { Jsx } from '~shared/types/generic'

import { EditorProps } from '../specific/VisualValue'

const EditorSx = styled.div`
  border-radius: 3px;
  padding: 2px 5px;
  height: 24px;
  line-height: 20px;
  white-space: nowrap;
  width: min-content;
`

export const ArrayEditor = ({ value }: Jsx<EditorProps<ArrayValue>>) => (
  <EditorSx tabIndex={0}>{value?.value ?? '0'} items</EditorSx>
)
