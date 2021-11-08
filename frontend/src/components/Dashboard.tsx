import { DndContext } from '@dnd-kit/core'
import { IconCirclePlus } from '@tabler/icons'
import { delayP } from 'ramda-adjunct'
import React, { FC } from 'react'
import styled from 'styled-components'

import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { NewItem } from './generic/NewItem'
import { ResizableTable } from './generic/ResizableTable'
import { ProjectTreeHeader } from './specific/ProjectTreeHeader'
import { VisualTree } from './specific/VisualTree'

const columns: JSX.Element[] = [
  <ProjectTreeHeader />,
  <div>English</div>,
  <div>German</div>,
  <div>Finnish</div>
]

const Column = styled.div`
  padding: 0.5rem;
`

const Scroller = styled.div`
  max-width: 100%;
  flex: 1;
  overflow: auto;
  align-items: stretch;
  display: flex;
`

const Dashboard: FC = () => {
  return (
    <AppFrame>
      <Navigation />
      <Scroller>
        <DndContext>
          <ResizableTable columns={columns}>
            <Column>
              <VisualTree />
              <NewItem icon={IconCirclePlus} createTask={() => delayP(2000)} />
            </Column>
            <Column>A</Column>
            <Column>B</Column>
            <Column>C</Column>
          </ResizableTable>
        </DndContext>
      </Scroller>
    </AppFrame>
  )
}

export default Dashboard
