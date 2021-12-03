import { DndContext } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import React, { createContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useEffectOnce } from 'react-use'
import styled from 'styled-components'

import { projectFx } from '../events/project'
import { useVisibleNodes } from '../hooks/useVisibleNodes'
import { Node } from '../shared/types/domain/node'
import { $tagStore } from '../stores/$tagStore'
import { $mappedNodesStore, $treeStore } from '../stores/$treeStore'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { FocusNavigator } from './generic/FocusNavigator'
import { ResizableTable } from './generic/ResizableTable'
import { ColumnHeader } from './specific/ColumnHeader'
import { ProjectTreeHeader } from './specific/ProjectTreeHeader'
import { VisualTree } from './specific/VisualTree'
import { VisualValueList } from './specific/VisualValueList'

const Column = styled.div`
  padding: 0.5rem;
`

type DashboardContextType = {
  nodeMap: Record<string, Node>
}

export const dashboardContext = createContext<DashboardContextType>({ nodeMap: {} })

const Dashboard = () => {
  useEffectOnce(() => {
    void projectFx()
  })

  const { visibleTags } = useStore($tagStore)
  const root = useStore($treeStore)
  const nodeMap = useStore($mappedNodesStore)
  const { t } = useTranslation()
  const nodes = useVisibleNodes(root)

  const columns: JSX.Element[] = [
    <ProjectTreeHeader />,
    <ColumnHeader name={t('app.defaultValues')} />,
    ...visibleTags.map(tag => <ColumnHeader name={tag.name} tag={tag} />)
  ]

  return (
    <AppFrame>
      <Navigation />
      <DndContext>
        <dashboardContext.Provider value={{ nodeMap }}>
          <ResizableTable columns={columns}>
            <FocusNavigator
              columns={visibleTags.length + 2}
              rotated
              style={{ display: 'contents' }}
            >
              <Column>
                <VisualTree />
              </Column>
              <Column>
                <VisualValueList {...nodes} />
              </Column>
              {visibleTags.map(tag => (
                <Column key={tag.name}>
                  <VisualValueList tag={tag.name} {...nodes} />
                </Column>
              ))}
            </FocusNavigator>
          </ResizableTable>
        </dashboardContext.Provider>
      </DndContext>
    </AppFrame>
  )
}

export default Dashboard
