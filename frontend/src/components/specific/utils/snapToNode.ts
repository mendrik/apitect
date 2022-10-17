import { Modifier } from '@dnd-kit/core'
import { NodeId } from '~shared/types/domain/node'
import { Maybe } from '~shared/types/generic'

import { treeIndent } from '../../../constants'
import { DndOver } from '../node/types'

export const snapToNode =
  (openNodes: Record<NodeId, boolean>): Modifier =>
  ({ transform, over, active }) => {
    const overNode = (over?.data.current as Maybe<DndOver>)?.node
    const activeNode = (active?.data.current as Maybe<DndOver>)?.node
    if (!overNode || !activeNode) {
      return transform
    }
    const isOpen = openNodes[overNode.value.id] ?? false
    const depth = overNode.depth + (isOpen ? 1 : 0)
    const x = (depth + transform.x / treeIndent) | 0
    return {
      ...transform,
      x: (x - activeNode.depth) * treeIndent + 2,
      y: transform.y
    }
  }
