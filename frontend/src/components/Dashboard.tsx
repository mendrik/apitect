import { DndContext } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import React from 'react'
import styled from 'styled-components'
import { $tagStore } from '~stores/$tagStore'

import { Navigation } from './Navigation'
import { FocusNavigator } from './generic/FocusNavigator'
import { ResizableTable } from './generic/ResizableTable'
import { ArraySidePanel } from './specific/ArraySidePanel'
import { ColumnHeader } from './specific/ColumnHeader'
import { ProjectTreeHeader } from './specific/ProjectTreeHeader'
import { VisualTree } from './specific/VisualTree'
import { VisualValueList } from './specific/VisualValueList'

const AppFrame = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const Column = styled.div`
  padding: 0.5rem;
  font-weight: 300;
  font-family: 'Source Sans Pro';
`

const Dashboard = () => {
  const { visibleTags } = useStore($tagStore)

  const columns: JSX.Element[] = [
    <ProjectTreeHeader key="project-header" />,
    ...visibleTags.map(tag => <ColumnHeader key={tag.name} name={tag.name} tag={tag} />)
  ]

  return (
    <AppFrame>
      <DndContext>
        <Navigation />
        <ArraySidePanel>
          <ResizableTable columns={columns} defaultWidths={[1 + 0.1 * columns.length]}>
            <FocusNavigator
              columns={visibleTags.length + 1}
              rotated
              style={{ display: 'contents' }}
            >
              <Column>
                <VisualTree />
              </Column>
              {visibleTags.map(tag => (
                <Column key={tag.name}>
                  <VisualValueList tag={tag.name} />
                </Column>
              ))}
            </FocusNavigator>
          </ResizableTable>
        </ArraySidePanel>
      </DndContext>
    </AppFrame>
  )
}

export default Dashboard
