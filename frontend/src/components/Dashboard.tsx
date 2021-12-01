import { DndContext } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useVisibleNodes } from '../hooks/useVisibleNodes'
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

const Scroller = styled.div`
  max-width: 100%;
  flex: 1;
  overflow: auto;
  align-items: stretch;
  display: flex;
`

const Dashboard = () => {
  const { visibleTags } = useStore($appStore)
  const { t } = useTranslation()
  const nodes = useVisibleNodes()

  const columns: JSX.Element[] = [
    <ProjectTreeHeader />,
    <ColumnHeader name={t('app.defaultValues')} />,
    ...visibleTags.map(tag => <ColumnHeader name={tag.name} tag={tag} />)
  ]

  return (
    <AppFrame>
      <Navigation />
      <Scroller>
        <DndContext>
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
        </DndContext>
      </Scroller>
    </AppFrame>
  )
}

export default Dashboard
