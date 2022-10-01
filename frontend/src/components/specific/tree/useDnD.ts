import {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  MouseSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { DragStartEvent } from '@dnd-kit/core/dist/types'
import { eqBy, path, propEq } from 'ramda'
import { useState } from 'react'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'

import { verticalRowStrategy } from '../utils/verticalRowStrategy'

export const sameType = eqBy(path(['data', 'current', 'type']))

export const useDnd = (root: TreeNode<Node>) => {
  const [draggedNode, setDraggedNode] = useState<TreeNode<Node> | null>(null)
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }))

  const onDragEnd = (ev: DragEndEvent) => {}

  const onDragMove = (ev: DragMoveEvent) => {}

  const onDragStart = (ev: DragStartEvent) => {
    const first = root.first(propEq('id', ev.active.id))
    setDraggedNode(first ?? null)
  }

  const onDragOver = (ev: DragOverEvent) => {}

  return {
    onDragStart,
    onDragOver,
    onDragMove,
    onDragEnd,
    collisionDetection: verticalRowStrategy,
    draggedNode,
    sensors,
    autoScroll: true
  }
}
