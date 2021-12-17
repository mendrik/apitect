import { createStore } from 'effector'
import { NodeId } from '~shared/types/domain/node'
import { safeParseJson } from '~shared/utils/ramda'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'
import { openNodeState, selectNode } from '../events/tree'

const initial = safeParseJson<Record<NodeId, boolean>>(localStorage.getItem('openNodes'))

export const $openNodes = createStore<Record<NodeId, boolean>>(initial ?? {})
  .on(projectFx.doneData, (state, result) => ({
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

$openNodes.watch(state => {
  localStorage.setItem('openNodes', JSON.stringify(state))
})
