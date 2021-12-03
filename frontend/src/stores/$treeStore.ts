import { createStore } from 'effector'
import { isNil, prop, unless } from 'ramda'

import { projectFx } from '../events/tree'
import { TreeNode } from '../shared/algebraic/treeNode'
import { Node } from '../shared/types/domain/node'
import { NodeType } from '../shared/types/domain/nodeType'
import { byProp } from '../shared/utils/ramda'

const $rawTree = createStore<Node>({
  nodeType: NodeType.Object,
  id: '',
  children: [],
  name: 'root'
})

export const $treeStore = $rawTree.map(unless(isNil, TreeNode.from<Node, 'children'>('children')))
export const $mappedNodesStore = $treeStore.map<Record<string, Node>>(root =>
  byProp('id', root.flatten().map(prop('value')))
)

$rawTree.on(projectFx.done, (state, { result }) => result.document.tree)
