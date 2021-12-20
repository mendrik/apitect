import React from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

type OwnProps = {}

const ColumnSx = styled.div`
  padding: 0.5rem;
  font-weight: 300;
  font-family: 'Source Sans Pro';
`

export const Column = ({ children }: Jsx<OwnProps>) => <ColumnSx>{children}</ColumnSx>
