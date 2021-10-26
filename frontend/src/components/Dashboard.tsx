import React, { FC } from 'react'
import styled from 'styled-components'

import { useRequest } from '../hooks/useRequest'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { ColumnData, ResizableTable } from './generic/ResizableTable'

const columns: ColumnData[] = [
  { title: 'Project tree' },
  { title: 'Base information' },
  { title: 'English' },
  { title: 'Finnish' },
  { title: 'German' }
]

const Scroller = styled.div`
  max-width: 100%;
  flex: 1;
  overflow: auto;
  align-items: stretch;
  display: flex;
`

const Dashboard: FC = () => {
  useRequest({ type: 'DOCUMENT' })

  return (
    <AppFrame>
      <Navigation />
      <Scroller>
        <ResizableTable columns={columns} />
      </Scroller>
    </AppFrame>
  )
}

export default Dashboard
