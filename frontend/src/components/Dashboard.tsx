import { useStore } from 'effector-react'
import styled from 'styled-components'
import { $tagStore } from '~stores/$tagStore'

import { Navigation } from './Navigation'
import { FocusNavigator } from './generic/FocusNavigator'
import { ResizableTable } from './generic/resizabletable/ResizableTable'
import { Column } from './specific/Column'
import { ColumnHeader } from './specific/ColumnHeader'
import { ProjectTreeHeader } from './specific/ProjectTreeHeader'
import { SidePanel } from './specific/SidePanel'
import { Toasts } from './specific/Toasts'
import { VisualTree } from './specific/tree/VisualTree'
import { VisualValueList } from './specific/value/VisualValueList'

const AppFrame = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const Dashboard = () => {
  const { visibleTags } = useStore($tagStore)

  const columns: JSX.Element[] = [
    <ProjectTreeHeader key="project-header" />,
    ...visibleTags.map(tag => <ColumnHeader key={tag.name} name={tag.name} tag={tag} />)
  ]

  return (
    <AppFrame>
      <Navigation />
      <SidePanel>
        <ResizableTable columns={columns} defaultWidths={[1 + 0.1 * columns.length]}>
          <FocusNavigator columns={visibleTags.length + 1} rotated style={{ display: 'contents' }}>
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
      </SidePanel>
      <Toasts />
    </AppFrame>
  )
}

export default Dashboard
