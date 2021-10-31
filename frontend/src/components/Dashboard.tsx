import { DndContext } from '@dnd-kit/core'
import React, { FC } from 'react'
import styled from 'styled-components'

import { useRequest } from '../hooks/useRequest'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { ResizableTable } from './generic/ResizableTable'

const columns: JSX.Element[] = [
  <div>Project tree</div>,
  <div>English</div>,
  <div>German</div>,
  <div>Finnish</div>,
  <div>Polish</div>
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
        <DndContext>
          <ResizableTable columns={columns} />
        </DndContext>
      </Scroller>
    </AppFrame>
  )
}

export default Dashboard
