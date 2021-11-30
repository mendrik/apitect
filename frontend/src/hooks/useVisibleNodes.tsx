import { useStore } from 'effector-react'
import { isTrue } from 'ramda-adjunct'
import { useMemo } from 'react'

import { TreeNode } from '../shared/algebraic/treeNode'
import { Node } from '../shared/types/domain/node'
import $appStore from '../stores/$appStore'

export const useVisibleNodes = () => {
  const { tree, openNodes } = useStore($appStore)
  const root = useMemo(() => TreeNode.from<Node, 'children'>('children')(tree), [tree])

  const isVisible = (n: TreeNode<Node>) =>
    n
      .pathToRoot()
      .map(n => openNodes[n.id])
      .every(isTrue)

  return useMemo(() => root.flatten().filter(isVisible), [root, openNodes])
}
