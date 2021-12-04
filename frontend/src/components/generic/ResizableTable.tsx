import { DragStartEvent, useDndMonitor, useDraggable } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import { pipe, propOr } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { useRef } from 'react'
import { useDeepCompareEffect } from 'react-use'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { $tagStore } from '../../stores/$tagStore'
import { Draggable, Draggables } from '../../utils/draggables'

type OwnProps = {
  columns: JSX.Element[]
}

const StyledGrid = styled.div<{ columns: any[] }>`
  display: grid;
  grid-template-columns: ${pipe(
    propOr([], 'columns'),
    mapIndexed((_, i, c) => `minmax(var(--col-width-${i}, ${100 / c.length}%), auto)`)
  )};
  grid-template-rows: 32px;
  grid-auto-rows: auto;
  max-width: 100vw;
  overflow: hidden;
`

const StyledHeader = styled.div`
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
  const style = grid.current?.style

  const { visibleTags } = useStore($tagStore)

  useDeepCompareEffect(() => {
    const width = grid.current?.offsetWidth ?? 0
    Array.from(columns).forEach((_, idx) =>
      style?.setProperty(`--col-width-${idx}`, `${width / columns.length}px`)
    )
  }, [columns, visibleTags])

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
    <StyledGrid ref={grid} columns={columns} className="custom-scrollbars">
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
