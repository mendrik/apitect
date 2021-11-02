import { DndContext } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import React, { FC, useMemo, useState } from 'react'
import { Plus } from 'react-feather'
import styled from 'styled-components'

import { TreeNode } from '../shared/algebraic/treeNode'
import { UiNode } from '../shared/types/domain/tree'
import appStore from '../stores/appStore'
import { wait } from '../utils/wait'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { NewItem } from './generic/NewItem'
import { ResizableTable } from './generic/ResizableTable'
import { ProjectTreeHeader } from './specific/ProjectTreeHeader'
import { VisualNode, VisualNodeTemplate } from './specific/VisualNodeTemplate'

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
  const { tree } = useStore(appStore)
  const [, forceRender] = useState(false)

  const visualTree = useMemo(() => {
    const t = TreeNode.from<UiNode, 'children'>('children')(tree)
    return t.map(
      t =>
        new Proxy<VisualNode>(
          {
            name: t.name,
            open: false
          },
          {
            set<T extends VisualNode>(target: T, prop: keyof T, value: any): boolean {
              target[prop] = value
              forceRender(s => !s)
              return true
            }
          }
        )
    )
  }, [tree])

  return (
    <AppFrame>
      <Navigation />
      <Scroller>
        <DndContext>
          <ResizableTable columns={columns}>
            <Column>
              <VisualNodeTemplate node={visualTree} depth={0}>
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
