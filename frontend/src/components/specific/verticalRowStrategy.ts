import { ClientRect, CollisionDetection } from '@dnd-kit/core'
import type { Coordinates } from '@dnd-kit/core/dist/types'
import type { CollisionDescriptor } from '@dnd-kit/core/dist/utilities/algorithms/types'

type Ord<T> = (a: T, b: T) => number

const sortCollisionsDesc: Ord<CollisionDescriptor> = (
  { data: { value: a } },
  { data: { value: b } }
) => a - b

const getClosestRow = (entry: ClientRect, pointer: Coordinates): number => {
  const eCenter = entry.top + (entry.height >> 1)
  return Math.abs(eCenter - pointer.y)
}

export const verticalRowStrategy: CollisionDetection = ({
  pointerCoordinates: pointer,
  droppableRects,
  droppableContainers
}) => {
  const collisions: CollisionDescriptor[] = []

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer
    const rect = droppableRects.get(id)

    if (rect && pointer) {
      const distance = getClosestRow(rect, pointer)
      collisions.push({
        id,
        data: { droppableContainer, value: distance }
      })
    }
  }

  if (collisions.length === 0) {
    return []
  }

  const sortedCols = collisions.sort(sortCollisionsDesc)
  return [sortedCols[0]]
}
