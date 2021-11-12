import { DragStartEvent, useDndMonitor, useDraggable } from '@dnd-kit/core'
import { max, multiply, pathOr, pipe, propOr } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { ReactNode, useRef } from 'react'
import styled from 'styled-components'

import { Jsx } from '../../shared/types/generic'
import { Draggable, Draggables } from '../../utils/draggables'

type OwnProps = {
  columns: JSX.Element[]
  children: ReactNode[]
}

const StyledGrid = styled.div<{ columns: any[] }>`
  display: grid;
  grid-template-columns: ${pipe(
    propOr([], 'columns'),
    mapIndexed((_, i) => `var(--col-width-${i}, 1fr) `)
  )};
  grid-template-rows: 32px;
  grid-auto-rows: auto;
  align-items: stretch;
  min-width: ${pipe(pathOr(1, ['columns', 'length']), multiply(200))}px;
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

const Header = ({ index, last, children }: Jsx<HeaderProps>) => {
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
      <div>{children}</div>
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

const bodyStyle = document.body.style

export const ResizableTable = ({ columns, children }: Jsx<OwnProps>) => {
  const grid = useRef<HTMLDivElement>(null)

  console.assert(columns.length === children.length, 'Children count must match column count')

  useDndMonitor({
    onDragStart(event) {
      const data = event.active.data.current as Draggable
      if (data?.type === Draggables.COLUMN_HEADER) {
        bodyStyle.setProperty('cursor', 'col-resize')
        const nextWidth = grid.current?.children.item(data.index + 1)?.getBoundingClientRect().width
        if (nextWidth) {
          event.active.data.current = {
            ...event.active.data.current,
            nextWidth
          }
        }
      }
    },
    onDragMove(event) {
      const data = event.active.data.current as Draggable
      if (data?.type === Draggables.COLUMN_HEADER) {
        const startWidth = event.active.rect.current.initial?.width ?? NaN
        const nextWidth = data.nextWidth
        const deltaX = event.delta.x
        const style = grid.current?.style
        style?.setProperty(`--col-width-${data.index}`, `${max(startWidth + deltaX, 200)}px`)
        style?.setProperty(`--col-width-${data.index + 1}`, `${max(nextWidth - deltaX, 200)}px`)
      }
    },
    onDragEnd(event) {
      bodyStyle.setProperty('cursor', 'default')
      const data = event.active.data.current as Draggable
      if (data?.type === Draggables.COLUMN_HEADER && grid.current != null) {
        // when we are done let's convert pixels to relative units
        const totalWidth = grid.current.getBoundingClientRect().width
        const children = grid.current.children
        const ar = totalWidth / columns.length
        requestAnimationFrame(() => {
          Array.from(columns).forEach((_, idx) => {
            const relativeWidth = children[idx].getBoundingClientRect().width / ar
            grid.current?.style?.setProperty(`--col-width-${idx}`, `${relativeWidth.toFixed(4)}fr`)
          })
        })
      }
    }
  })

  return (
    <StyledGrid ref={grid} columns={columns}>
      {columns.map((column, col) => (
        <div key={col}>
          <Header index={col} last={col === columns.length - 1}>
            {column}
          </Header>
        </div>
      ))}
      {children}
    </StyledGrid>
  )
}
