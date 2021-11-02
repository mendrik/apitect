import { DndContext } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { Plus } from 'react-feather'
import styled from 'styled-components'

import { useRequest } from '../hooks/useRequest'
import { treeStore } from '../stores/treeStore'
import { wait } from '../utils/wait'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { NewItem } from './generic/NewItem'
import { ResizableTable } from './generic/ResizableTable'
import { ProjectTreeHeader } from './specific/ProjectTreeHeader'
import { Column, VisualNodeTemplate } from './specific/VisualNodeTemplate'

const columns: JSX.Element[] = [
  <ProjectTreeHeader />,
  <div>English</div>,
  <div>German</div>,
  <div>Finnish</div>
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
  const tree = useStore(treeStore)

  return (
    <AppFrame>
      <Navigation />
      <Scroller>
        <DndContext>
          <ResizableTable columns={columns}>
            <VisualNodeTemplate node={tree}>
              <NewItem icon={Plus} createTask={wait(1)} />
            </VisualNodeTemplate>
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
