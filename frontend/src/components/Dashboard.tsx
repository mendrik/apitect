import { DndContext } from '@dnd-kit/core'
import { identity } from 'ramda'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { MaskedInput } from '../forms/MaskedInput'
import { AppFrame } from './AppFrame'
import { Navigation } from './Navigation'
import { ResizableTable } from './generic/ResizableTable'
import { ProjectTreeHeader } from './specific/ProjectTreeHeader'
import { VisualTree } from './specific/VisualTree'

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

const Dashboard = () => {
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
                <MaskedInput
                  name="mask"
                  mask="€ #"
                  format={{
                    '#': [/[-\d,]/, (d: string) => d],
                    '*': [/w+/, identity]
                  }}
                />
              </FormProvider>
            </Column>
            <Column>B</Column>
            <Column>C</Column>
          </ResizableTable>
        </DndContext>
      </Scroller>
    </AppFrame>
  )
}

export default Dashboard
