import { DndContext, useDraggable } from '@dnd-kit/core'
import { fromNullable } from 'fp-ts/Option'
import { pathOr } from 'ramda'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useResize } from '../../hooks/useResize'

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
  const { attributes, listeners, setNodeRef, transform, node } = useDraggable({ id })
  const resize = useResize(node)
  const w = fromNullable(resize?.width)
  const d = fromNullable(transform?.x)

  return (
    <StyledHeader
      className="px-2 py-1 bevel-bottom"
      ref={setNodeRef}
      style={{
        width: w ?? 'auto'
      }}
    >
      <Row>{children}</Row>
      <ColResizer {...attributes} {...listeners} id={id} />
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

export const ResizableTable: FC<OwnProps> = ({ columns, children }) => {
  const { t } = useTranslation()

  const data = useMemo(() => new Array(30).map((_, row) => <Row key={row}>{row}</Row>), [])

  return (
    <DndContext>
      <StyledGrid>
        {columns.map((column, col) => (
          <Column key={col}>
            <Header id={`header-${col}`}>{column.title}</Header>
            {data}
          </Column>
        ))}
      </StyledGrid>
    </DndContext>
  )
}
