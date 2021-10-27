import {
  DndContext,
  DragMoveEvent,
  DragStartEvent,
  useDndMonitor,
  useDraggable
} from '@dnd-kit/core'
import { pathOr } from 'ramda'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export type ColumnData = {
  title: string
}

type OwnProps = {
  columns: ColumnData[]
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${pathOr(1, ['children', 'length'])}, minmax(270px, 1fr));
  grid-template-rows: 32px;
  grid-auto-rows: 20px;
  align-items: stretch;
`

const StyledHeader = styled.div`
  display: block;
  position: relative;
`

type HeaderProps = {
  id: string
}

const Header: FC<HeaderProps> = ({ id, children }) => {
  useDndMonitor({
    onDragMove(event: DragMoveEvent) {
      console.log(event)
    },
    onDragStart(event: DragStartEvent) {
      console.log(event)
    }
  })
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id
  })

  console.log(transform?.x)

  return (
    <DndContext>
      <StyledHeader className="px-2 py-1 bevel-bottom" ref={setNodeRef}>
        <Row>{children}</Row>
        <ColResizer {...attributes} {...listeners} />
      </StyledHeader>
    </DndContext>
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

export const ResizableTable: FC<OwnProps> = ({ columns, children }) => {
  const { t } = useTranslation()

  const data = useMemo(() => new Array(30).map((_, row) => <Row key={row}>{row}</Row>), [])

  return (
    <StyledGrid>
      {columns.map((column, col) => (
        <Column key={col}>
          <Header id={`header-${col}`}>{column.title}</Header>
          {data}
        </Column>
      ))}
    </StyledGrid>
  )
}
