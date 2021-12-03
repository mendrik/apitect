import { createStore } from 'effector'
import { isNil, prop, propEq, unless } from 'ramda'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'
import { createNodeFx, deleteNodeFx, selectNode, updateNodeSettingsFx } from '../events/tree'
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
  .on(projectFx.done, (state, { result }) => result.document.tree)
  .on(deleteNodeFx.done, (state, { result }) => result.tree)
  .on(createNodeFx.done, (state, { result }) => {
    console.log(result.tree)
    return result.tree
  })
  .on(updateNodeSettingsFx.done, (state, { result }) => result)

export const $treeStore = $rawTree
  .map(unless(isNil, TreeNode.from<Node, 'children'>('children')))
  .on(createNodeFx.done, (state, { result }) => {
    console.log(state)
    const node = state.first(propEq('id', result.nodeId)) ?? null
    void selectNode(node)
  })
  .on(deleteNodeFx.done, (state, { result }) => {
    const parent = state.first(propEq('id', result.parentNode))
    const node = parent?.children[result.position - 1] ?? parent ?? null
    void selectNode(node)
  })

export const $mappedNodesStore = $treeStore.map<Record<string, Node>>(root =>
  byProp('id', root.flatten().map(prop('value')))
)

$rawTree.reset(resetProject)
