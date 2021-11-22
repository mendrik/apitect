import { DndContext } from '@dnd-kit/core'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import { TagInput } from '../forms/TagInput'
import { Tag } from '../shared/types/domain/tag'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { ResizableTable } from './generic/ResizableTable'
import { ProjectTreeHeader } from './specific/ProjectTreeHeader'
import { VisualTree } from './specific/VisualTree'

const columns: JSX.Element[] = [<ProjectTreeHeader />, <div>English</div>]

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
                <TagInput
                  name="mask"
                  label="form.fields.number"
                  tags={tags}
                  onAdd={name =>
                    setTags(tags => [
                      ...tags,
                      {
                        id: uuid(),
                        name,
                        owners: []
                      }
                    ])
                  }
                  onRemove={tag => setTags(tags => tags.filter(t => t !== tag))}
                />
              </FormProvider>
            </Column>
          </ResizableTable>
        </DndContext>
      </Scroller>
    </AppFrame>
  )
}

export default Dashboard
