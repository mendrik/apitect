import { DndContext } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import { CSSProperties, useRef } from 'react'
import { Jsx } from '~shared/types/generic'
import { $selectedRow } from '~stores/$selectedNode'

import { Headers } from './Headers'
import { StyledGrid } from './StyledGrid'

type OwnProps = {
  columns: JSX.Element[]
  defaultWidths?: number[]
}

export const ResizableTable = ({ columns, defaultWidths, children }: Jsx<OwnProps>) => {
  const grid = useRef<HTMLDivElement>(null)
  const selectedRow = useStore($selectedRow)

  return (
    <StyledGrid
      ref={grid}
      columns={columns}
      defaultWidths={defaultWidths}
      className="custom-scrollbars position-relative"
      style={{ top: -scrollY, '--selectedRow': selectedRow } as CSSProperties}
    >
      <DndContext>
        <Headers columns={columns} grid={grid} />
      </DndContext>
      {children}
    </StyledGrid>
  )
}
