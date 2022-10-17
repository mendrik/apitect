import { Modifier } from '@dnd-kit/core'
import { clamp, find, pathEq, Pred, view } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Node, NodeId } from '~shared/types/domain/node'
import { NodeType } from '~shared/types/domain/nodeType'
import { Maybe } from '~shared/types/generic'
import { lensNext } from '~shared/utils/ramda'

import { treeIndent } from '../../../constants'
import { DndOver } from '../node/types'

export const snapToNode =
  (openNodes: Record<NodeId, boolean>, visibleNodes: TreeNode<Node>[]): Modifier =>
  ({ transform, over, active }) => {
    const overNode = (over?.data.current as Maybe<DndOver>)?.node
    const activeNode = (active?.data.current as Maybe<DndOver>)?.node
    if (!overNode || !activeNode) {
      return transform
    }
    const byOverId: Pred<[TreeNode<Node>]> = pathEq(['value', 'id'], overNode.value.id)
    const visibleOver = find(byOverId, visibleNodes)
    const depth = overNode.depth + (overNode.value.nodeType === NodeType.Object ? 1 : 0)
    const nextDepth = view(lensNext(visibleOver), visibleNodes)?.depth ?? depth
    const clampedX = clamp(nextDepth, depth, (transform.x / treeIndent) | 0)
    return {
      ...transform,
      x: (clampedX - activeNode.depth) * treeIndent + 2,
      y: transform.y
    }
  }
