import { ClientRect, CollisionDetection } from '@dnd-kit/core'
import { CollisionDescriptor } from '@dnd-kit/core/dist/utilities/algorithms/types'

type Ord<T> = (a: T, b: T) => number

const sortCollisionsDesc: Ord<CollisionDescriptor> = (
  { data: { value: a } },
  { data: { value: b } }
) => a - b

const getClosestRow = (entry: ClientRect, target: ClientRect): number => {
  const eCenter = entry.top + (entry.height >> 1)
  const tCenter = target.top + (target.height >> 1)
  return Math.abs(eCenter - tCenter)
}

export const verticalRowStrategy: CollisionDetection = ({
  collisionRect,
  droppableRects,
  droppableContainers
}) => {
  const collisions: CollisionDescriptor[] = []

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer
    const rect = droppableRects.get(id)

    if (rect) {
      const distance = getClosestRow(rect, collisionRect)
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
