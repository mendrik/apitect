import { Modifier } from '@dnd-kit/core'
import { equals, propEq } from 'ramda'
import { NodeId } from '~shared/types/domain/node'
import { Maybe } from '~shared/types/generic'
import { next } from '~shared/utils/ramda'

import { treeIndent } from '../../../constants'
import { DndOver } from '../node/types'

export const snapToNode =
  (openNodes: Record<NodeId, boolean>, visibleNodes: NodeId[]): Modifier =>
  ({ transform, over, active }) => {
    const overNode = (over?.data.current as Maybe<DndOver>)?.node
    const activeNode = (active?.data.current as Maybe<DndOver>)?.node
    if (!overNode || !activeNode) {
      return transform
    }
    const nextNodeId = next(equals(overNode.value.id))(visibleNodes)
    const nextNode = overNode.root.first(propEq('id', nextNodeId))
    const isOpen = openNodes[overNode.value.id] ?? false
    const depth = overNode.depth + (isOpen ? 1 : 0) - activeNode.depth
    // const minX = overNode.isLast ? (nextNode ? nextNode.depth : 1) : depth
    // const x = clamp(minX, depth, transform.x / treeIndent)
    // eslint-disable-next-line no-console
    console.log(nextNode?.value.name)
    return {
      ...transform,
      x: depth * treeIndent + 2,
      y: transform.y
    }
  }
