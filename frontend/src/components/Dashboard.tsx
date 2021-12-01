import { DndContext } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import React, { createContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMap } from 'react-use'
import styled from 'styled-components'

import { useVisibleNodes } from '../hooks/useVisibleNodes'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Node } from '../shared/types/domain/node'
import { byProp } from '../shared/utils/ramda'
import $appStore from '../stores/$appStore'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { ResizableTable } from './generic/ResizableTable'
import { ColumnHeader } from './specific/ColumnHeader'
import { ProjectTreeHeader } from './specific/ProjectTreeHeader'
import { VisualTree } from './specific/VisualTree'
import { VisualValueList } from './specific/VisualValueList'

const Column = styled.div`
  padding: 0.5rem;
`

const Scroller = styled.div``

type DashboardContextType = {
  nodeMap: Record<string, Node>
}

export const dashboardContext = createContext<DashboardContextType>({ nodeMap: {} })

const Dashboard = () => {
  const { tree, visibleTags } = useStore($appStore)
  const { t } = useTranslation()
  const [nodeMap, { setAll }] = useMap<Record<string, Node>>()

  const root = useMemo(() => {
    const root = TreeNode.from<Node, 'children'>('children')(tree)
    const record = byProp(
      'id',
      root.flatten().map(x => x.value)
    )
    setAll(record)
    return root
  }, [tree])

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
          </ResizableTable>
        </dashboardContext.Provider>
      </DndContext>
    </AppFrame>
  )
}

export default Dashboard
