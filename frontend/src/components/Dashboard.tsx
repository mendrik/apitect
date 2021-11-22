import { DndContext } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { TreeInput } from '../forms/TreeInput'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Node } from '../shared/types/domain/node'
import $appStore from '../stores/$appStore'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { ResizableTable } from './generic/ResizableTable'
import { ProjectTreeHeader } from './specific/ProjectTreeHeader'
import { VisualTree } from './specific/VisualTree'

const columns: JSX.Element[] = [<ProjectTreeHeader />, <div>English</div>, <div>German</div>]

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
  const { tree } = useStore($appStore)
  const root = useMemo(() => TreeNode.from<Node, 'children'>('children')(tree), [tree])

  const form = useForm()
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
              <FormProvider {...form}>
                <TreeInput
                  name="tree"
                  label="form.fields.number"
                  tree={root}
                  onSelect={node => console.log(node)}
                />
              </FormProvider>
            </Column>
            <Column>bla</Column>
          </ResizableTable>
        </DndContext>
      </Scroller>
    </AppFrame>
  )
}

export default Dashboard
