import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  useDndMonitor,
  useDraggable
} from '@dnd-kit/core'
import { max, multiply, pathOr, pipe, propOr } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { FC, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { Draggable, Draggables } from '../../utils/draggables'

type OwnProps = {
  columns: JSX.Element[]
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: ${pipe(
    propOr([], 'children'),
    mapIndexed((_, i) => `var(--col-width-${i}, 1fr) `)
  )};
  grid-template-rows: 32px;
  grid-auto-rows: 20px;
  align-items: stretch;
  min-width: ${pipe(pathOr(1, ['children', 'length']), multiply(200))}px;
  width: 100%;
`

const StyledHeader = styled.div`
  display: block;
  position: relative;
`

type HeaderProps = {
  index: number
  last: boolean
}

const Header: FC<HeaderProps> = ({ index, last, children }) => {
  const id = `header-${index}`
  const { attributes, listeners, setNodeRef, node } = useDraggable({
    id
  })

  useDndMonitor({
    onDragStart(event: DragStartEvent) {
      if (node.current && event.active.id === id) {
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
      <Row className="editable">{children}</Row>
      {!last && <ColResizer {...attributes} {...listeners} id={`drag-header-${index}`} />}
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
  cursor: col-resize;
  z-index: 1;
  &:after {
    content: '';
    position: absolute;
    width: 2px;
    background: repeating-linear-gradient(to right, #ddd, #ddd 1px, #fff 1px, #fff 2px);
    height: 100%;
    left: 50%;
    top: 0%;
    margin-left: -1px;
  }
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

const bodyStyle = document.body.style

export const ResizableTable: FC<OwnProps> = ({ columns, children }) => {
  const data = useMemo(() => new Array(30).map((_, row) => <Row key={row}>{row}</Row>), [])
  const grid = useRef<HTMLDivElement>(null)
  const [nextWidth, setNextWidth] = useState(0)

  useDndMonitor({
    onDragStart(event) {
      const data = event.active.data.current as Draggable
      if (data?.type === Draggables.COLUMN_HEADER) {
        bodyStyle.setProperty('cursor', 'col-resize')
        const width = grid.current?.children.item(data.index + 1)?.getBoundingClientRect().width
        if (width) {
          setNextWidth(width)
        }
      }
    },
    onDragEnd(event: DragEndEvent) {
      bodyStyle.setProperty('cursor', 'default')
      const data = event.active.data.current as Draggable
      if (data?.type === Draggables.COLUMN_HEADER && grid.current != null) {
        // when we are done let's convert pixels to relative units
        const totalWidth = grid.current.getBoundingClientRect().width
        const columns = grid.current.children
        Array.from(columns).forEach((c, idx) => {
          const relativeWidth = c.getBoundingClientRect().width / (totalWidth / columns.length)
          grid.current?.style?.setProperty(`--col-width-${idx}`, `${relativeWidth}fr`)
        })
      }
    },
    onDragMove(event: DragMoveEvent) {
      const data = event.active.data.current as Draggable
      if (data?.type === Draggables.COLUMN_HEADER) {
        const startWidth = event.active.rect.current.initial?.width ?? NaN
        const deltaX = event.delta.x
        const style = grid.current?.style
        style?.setProperty(`--col-width-${data.index}`, `${max(startWidth + deltaX, 200)}px`)
        style?.setProperty(`--col-width-${data.index + 1}`, `${max(nextWidth - deltaX, 200)}px`)
      }
    }
  })

  return (
    <StyledGrid ref={grid}>
      {columns.map((column, col) => (
        <Column key={col}>
          <Header index={col} last={col === columns.length - 1}>
            {column}
          </Header>
          {data}
        </Column>
      ))}
    </StyledGrid>
  )
}
