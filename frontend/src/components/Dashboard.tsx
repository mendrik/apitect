import { DndContext } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import { append, without } from 'ramda'
import React, { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { TreeNode } from '../shared/algebraic/treeNode'
import { Node } from '../shared/types/domain/node'
import { Tag } from '../shared/types/domain/tag'
import $appStore from '../stores/$appStore'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { DateInput } from './forms/DateInput'
import { TagInput } from './forms/TagInput'
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
  const [tags, setTags] = useState<Tag[]>([])

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
                <DateInput name="date" label="form.fields.number" className="mb-3" />
                <TagInput
                  name="tags"
                  label="form.fields.number"
                  containerClasses="mb-3"
                  tags={tags}
                  onAdd={name => setTags(append({ name, id: 0 }))}
                  onRemove={tag => setTags(without([tag]))}
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
