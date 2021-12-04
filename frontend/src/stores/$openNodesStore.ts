import { combine, createStore } from 'effector'
import { prop } from 'ramda'
import { isTrue } from 'ramda-adjunct'
import { useDeepCompareEffect } from 'react-use'
import { Strategy, TreeNode } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/node'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'
import { openNodeState, selectNode } from '../events/tree'
import { $treeStore } from './$treeStore'

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
