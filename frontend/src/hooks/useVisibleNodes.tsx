import { useStore } from 'effector-react'
import { difference, prop } from 'ramda'
import { isTrue } from 'ramda-adjunct'
import { useState } from 'react'
import { useDeepCompareEffect } from 'react-use'

import { Strategy, TreeNode } from '../shared/algebraic/treeNode'
import { Node } from '../shared/types/domain/node'
import $appStore from '../stores/$appStore'

export const useVisibleNodes = (root: TreeNode<Node>) => {
  const { openNodes } = useStore($appStore)
  const [visibleNodeIds, setVisibleNodeIs] = useState<string[]>([])
  const [newNodeIds, setNewNodeIds] = useState<string[]>([])

  const isVisible = (n: TreeNode<Node>) =>
    n
      .pathToRoot()
      .map(n => openNodes[n.id])
      .every(isTrue)

  useDeepCompareEffect(() => {
    const nodeIds = root
      .flatten(Strategy.Depth)
      .filter(isVisible)
      .slice(1) // skip root
      .map(n => n.extract())
      .map(prop('id'))
    setVisibleNodeIs(oldVisibleNodeIds => {
      setNewNodeIds(difference(nodeIds, oldVisibleNodeIds))
      return nodeIds
    })
  }, [root, openNodes])

  return {
    visibleNodeIds,
    newNodeIds
  }
}
