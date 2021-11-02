import { DndContext } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { Plus } from 'react-feather'
import styled from 'styled-components'

import { useRequest } from '../hooks/useRequest'
import { TreeNode } from '../shared/algebraic/treeNode'
import { UiNode } from '../shared/types/domain/tree'
import appStore from '../stores/appStore'
import { wait } from '../utils/wait'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { NewItem } from './generic/NewItem'
import { ResizableTable } from './generic/ResizableTable'
import { ProjectTreeHeader } from './specific/ProjectTreeHeader'
import { VisualNodeTemplate } from './specific/VisualNodeTemplate'

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
  useRequest({ type: 'DOCUMENT' })
  const { document } = useStore(appStore)

  if (document == null) {
    return null
  }

  const tree = TreeNode.from<UiNode, 'children'>('children')(document.tree)

  return (
    <AppFrame>
      <Navigation />
      <Scroller>
        <DndContext>
          <ResizableTable columns={columns}>
            <Column>
              <VisualNodeTemplate node={tree} root>
                <NewItem icon={Plus} createTask={wait(1)} />
              </VisualNodeTemplate>
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
