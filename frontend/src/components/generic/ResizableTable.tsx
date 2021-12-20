import { DragStartEvent, useDndMonitor, useDraggable } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import { mapIndexed } from 'ramda-adjunct'
import React, { CSSProperties, useRef } from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'
import { $selectedRow } from '~stores/$selectedNode'

import { Palette } from '../../css/colors'
import { Draggable, Draggables } from '../../utils/draggables'

type OwnProps = {
  columns: JSX.Element[]
  defaultWidths?: number[]
}

const StyledGrid = styled.div<{ columns: any[]; defaultWidths?: number[] }>`
  --selectedRow: -5;
  display: grid;
  width: 100%;
  grid-template-columns: ${({ columns, defaultWidths }) =>
    mapIndexed((_, i) => `minmax(auto, var(--col-width-${i}, ${defaultWidths?.[i] ?? 1}fr)) `)(
      columns
    )};
  grid-template-rows: 32px;
  grid-auto-rows: auto;

  &:before {
    content: '';
    position: absolute;
    background-color: #f0f7df;
    height: 24px;
    left: 0;
    right: 0;
    top: calc(32px + 0.5rem + var(--selectedRow) * 24px);
    z-index: -1;
  }
`

const Sticky = styled.div`
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
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
    <div className="px-2 py-1 bevel-bottom" ref={setNodeRef}>
      <div>{children}</div>
      {!last && <ColResizer {...attributes} {...listeners} id={`drag-header-${index}`} />}
    </div>
  )
}

const ColResizer = styled.div`
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

export const ResizableTable = ({ columns, defaultWidths, children }: Jsx<OwnProps>) => {
  const grid = useRef<HTMLDivElement>(null)
  const selectedRow = useStore($selectedRow)
  const style = grid.current?.style

  useDndMonitor({
    onDragStart(event) {
      const data = event.active.data.current as Draggable
      if (data?.type === Draggables.COLUMN_HEADER && grid.current != null) {
        bodyStyle.setProperty('cursor', 'col-resize')
        const next = grid.current?.children.item(data.index + 1) as HTMLElement | undefined
        const nextWidth = next?.offsetWidth
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
        const deltaX = event.delta.x - document.documentElement.scrollLeft
        if (startWidth + deltaX >= 100 && nextWidth - deltaX >= 100) {
          style?.setProperty(`--col-width-${data.index}`, `${startWidth + deltaX}px`)
          style?.setProperty(`--col-width-${data.index + 1}`, `${nextWidth - deltaX}px`)
        }
      }
    },
    onDragEnd() {
      bodyStyle.setProperty('cursor', 'default')
    }
  })

  return (
    <StyledGrid
      ref={grid}
      columns={columns}
      defaultWidths={defaultWidths}
      className="custom-scrollbars position-relative"
      style={{ top: -scrollY, '--selectedRow': selectedRow } as CSSProperties}
    >
      {columns.map((column, col) => (
        <Sticky key={col}>
          <Header index={col} last={col === columns.length - 1}>
            {column}
          </Header>
        </Sticky>
      ))}
      {children}
    </StyledGrid>
  )
}
