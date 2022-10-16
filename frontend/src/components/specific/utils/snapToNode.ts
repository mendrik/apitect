import { Modifier } from '@dnd-kit/core'
import { sample } from 'effector'
import { Maybe } from '~shared/types/generic'
import { $openNodes } from '~stores/$openNodesStore'

import { DndOver } from '../node/types'

const getOpenNodes = () => sample({ source: $openNodes }).getState()

export const snapToNode: Modifier = ({ transform, over }) => {
  const nodeData = over?.data.current as Maybe<DndOver>
  if (!nodeData?.node || !over?.rect) {
    return transform
  }
  const openNodes = getOpenNodes()
  const isOpen = openNodes[nodeData.node.value.id] ?? false
  const depth = nodeData.node.depth + (isOpen ? 1 : 0) - 1
  return {
    ...transform,
    x: depth * 16 + 2,
    y: transform.y
  }
}
