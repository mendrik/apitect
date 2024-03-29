import { combine, createStore, sample, Store } from 'effector'
import { map } from 'ramda'
import { isTrue } from 'ramda-adjunct'
import { Strategy, TreeNode } from '~shared/algebraic/treeNode'
import { Node, NodeId } from '~shared/types/domain/node'

import { $openNodes } from './$openNodesStore'
import { $treeStore } from './$treeStore'

export const $visibleNodes: Store<TreeNode<Node>[]> = combine(
  $openNodes,
  $treeStore,
  (openNodes, root) => {
    const isVisible = (n: TreeNode<Node>) =>
      n
        .pathToRoot()
        .map(n => openNodes[n.id])
        .every(isTrue)

    return root.flatten(Strategy.Depth).filter(isVisible).slice(1) // skip root
  }
)

export const $visibleNodeIds = createStore<NodeId[]>([])

sample({
  source: $visibleNodes,
  fn: map<TreeNode<Node>, NodeId>(n => n.value.id),
  target: $visibleNodeIds
})
