import { createStore } from 'effector'

import { resetProject } from '../events/reset'
import { openNodeState, projectFx, selectNode } from '../events/tree'

export const $openNodes = createStore<Record<string, boolean>>({})

$openNodes.watch(projectFx.done, (state, { result }) => ({
  ...state,
  [result.document.tree.id]: true
}))

$openNodes.watch(openNodeState, (state, [node, open]) => ({ ...state, [node.value.id]: open }))
$openNodes.watch(selectNode, (state, selectedNode) =>
  selectedNode
    ? { ...state, ...selectedNode.pathToRoot().reduce((p, c) => ({ ...p, [c.id]: true }), {}) }
    : state
)

$openNodes.reset(resetProject)
