import { createStore } from 'effector'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'
import { openNodeState, selectNode } from '../events/tree'

export const $openNodes = createStore<Record<string, boolean>>({})
  .on(projectFx.done, (state, { result }) => ({
    ...state,
    [result.document.tree.id]: true
  }))
  .on(openNodeState, (state, [node, open]) => ({ ...state, [node.value.id]: open }))
  .on(selectNode, (state, selectedNode) =>
    selectedNode != null
      ? { ...state, ...selectedNode.pathToRoot().reduce((p, c) => ({ ...p, [c.id]: true }), {}) }
      : state
  )
  .reset(resetProject)
