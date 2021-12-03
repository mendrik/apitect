import { createStore } from 'effector'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'
import { openNodeState, selectNode } from '../events/tree'

export const $openNodes = createStore<Record<string, boolean>>({})

$openNodes.on(projectFx.done, (state, { result }) => ({
  ...state,
  [result.document.tree.id]: true
}))

$openNodes.on(openNodeState, (state, [node, open]) => ({ ...state, [node.value.id]: open }))
$openNodes.on(selectNode, (state, selectedNode) =>
  selectedNode
    ? { ...state, ...selectedNode.pathToRoot().reduce((p, c) => ({ ...p, [c.id]: true }), {}) }
    : state
)

$openNodes.reset(resetProject)
