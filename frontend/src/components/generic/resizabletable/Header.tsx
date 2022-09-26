import { DragStartEvent, useDndMonitor, useDraggable } from '@dnd-kit/core'
import { Jsx } from '~shared/types/generic'

import { Draggables } from '../../../utils/draggables'
import { ColResizer } from './ColResizer'

type HeaderProps = {
  index: number
  last: boolean
}

export const Header = ({ index, last, children }: Jsx<HeaderProps>) => {
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
    <div className="px-2 py-1 bevel-bottom position-relative" ref={setNodeRef}>
      <div>{children}</div>
      {!last && <ColResizer {...attributes} {...listeners} id={`drag-header-${index}`} />}
    </div>
  )
}
