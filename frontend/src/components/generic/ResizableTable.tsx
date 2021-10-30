import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  useDndMonitor,
  useDraggable
} from '@dnd-kit/core'
import { multiply, pathOr, pipe, repeat } from 'ramda'
import React, { createContext, Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Fr } from '../../shared/types/generic'
import { Draggable, Draggables } from '../draggables'

export type ColumnData = {
  title: string
}

type OwnProps = {
  columns: ColumnData[]
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${pathOr(1, ['children', 'length'])}, 1fr);
  grid-template-rows: 32px;
  grid-auto-rows: 20px;
  align-items: stretch;
  min-width: ${pipe(pathOr(1, ['children', 'length']), multiply(200))}px;
`

const StyledHeader = styled.div`
  display: block;
  position: relative;
`

type HeaderProps = {
  index: number
}

const Header: FC<HeaderProps> = ({ index, children }) => {
  const id = `header-${index}`
  const { attributes, listeners, setNodeRef, node } = useDraggable({
    id
  })

  useDndMonitor({
    onDragStart(event: DragStartEvent) {
      if (node.current) {
        event.active.data.current = {
          type: Draggables.COLUMN_HEADER,
          startWidth: node.current.getBoundingClientRect().width,
          index
        }
      }
    }
  })

  return (
    <StyledHeader className="px-2 py-1 bevel-bottom" ref={setNodeRef}>
      <Row>{children}</Row>
      <ColResizer {...attributes} {...listeners} id={`drag-header-${index}`} />
    </StyledHeader>
  )
}

const ColResizer = styled.div`
  display: block;
  position: absolute;
  width: 10px;
  height: 100%;
  left: auto;
  right: -5px;
  top: 0px;
  background: yellow;
  cursor: col-resize;
  z-index: 1;
`

const Column = styled.div`
  display: block;
`

const Row = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

type ResizableGridContext = {
  widths: Fr[]
  setWidths: Dispatch<SetStateAction<Fr[]>>
}
const resizableGridContext = createContext<ResizableGridContext>({} as any)

const bodyStyle = document.body.style

export const ResizableTable: FC<OwnProps> = ({ columns, children }) => {
  const [widths, setWidths] = useState<Fr[]>(repeat(columns.length, 1))
  const data = useMemo(() => new Array(30).map((_, row) => <Row key={row}>{row}</Row>), [])

  useDndMonitor({
    onDragStart(event) {
      if (event.active.data.current?.type === Draggables.COLUMN_HEADER) {
        bodyStyle.setProperty('cursor', 'col-resize')
      }
    },
    onDragEnd(event: DragEndEvent) {
      bodyStyle.setProperty('cursor', 'default')
    },
    onDragMove(event: DragMoveEvent) {
      const data = event.active.data.current as Draggable
      if (data?.type === Draggables.COLUMN_HEADER) {
        console.log(data.index, data.startWidth, event.delta.x)
      }
    }
  })

  return (
    <resizableGridContext.Provider value={{ widths, setWidths }}>
      <StyledGrid>
        {columns.map((column, col) => (
          <Column key={col}>
            <Header index={col}>{column.title}</Header>
            {data}
          </Column>
        ))}
      </StyledGrid>
    </resizableGridContext.Provider>
  )
}
