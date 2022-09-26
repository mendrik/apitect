import { useDndMonitor } from '@dnd-kit/core'
import { useStore } from 'effector-react'
import { RefObject } from 'react'
import { useUpdateEffect } from 'react-use'
import { $tagStore } from '~stores/$tagStore'

import { Draggable, Draggables } from '../../../utils/draggables'
import { Header } from './Header'
import { Sticky } from './Sticky'
import { setColumnWidths } from './utils'

type OwnProps = {
  columns: JSX.Element[]
  grid: RefObject<HTMLDivElement>
}

const bodyStyle = document.body.style

export const Headers = ({ columns, grid }: OwnProps) => {
  const { visibleTags, tags } = useStore($tagStore)

  useUpdateEffect(() => {
    tags.forEach((_, index) => grid.current?.style.removeProperty(`--col-width-${index}`))
  }, [visibleTags, tags])

  useDndMonitor({
    onDragStart(event) {
      const data = event.active.data.current as Draggable | null
      if (data?.type === Draggables.COLUMN_HEADER && grid.current) {
        bodyStyle.setProperty('cursor', 'col-resize')
        setColumnWidths(grid.current, columns.length, w => `${w}px`)
        const next = grid.current.children.item(data.index + 1)
        const current = grid.current.children.item(data.index)
        if (next && current) {
          event.active.data.current = {
            ...event.active.data.current,
            startWidth: current.clientWidth,
            nextWidth: next.clientWidth
          }
        }
      }
    },
    onDragMove({ active, delta }) {
      const { type, index, nextWidth, startWidth } = active.data.current as Draggable
      if (type === Draggables.COLUMN_HEADER && grid.current?.style) {
        const style = grid.current.style
        const deltaX = delta.x - document.documentElement.scrollLeft
        if (startWidth + deltaX >= 100) {
          style.setProperty(`--col-width-${index}`, `${startWidth + deltaX}px`)
          if (nextWidth - deltaX >= 100) {
            style.setProperty(`--col-width-${index + 1}`, `${nextWidth - deltaX}px`)
          }
        }
      }
    },
    onDragEnd() {
      bodyStyle.setProperty('cursor', 'default')
      if (grid.current) {
        const totalWidth = grid.current.clientWidth
        setColumnWidths(grid.current, columns.length, w => `${(100 * w) / totalWidth}%`)
      }
    }
  })

  return (
    <>
      {columns.map((column, col) => (
        <Sticky key={col}>
          <Header index={col} last={col === columns.length - 1}>
            {column}
          </Header>
        </Sticky>
      ))}
    </>
  )
}
