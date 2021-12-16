import { combine, createStore, Store } from 'effector'
import { NodeId } from '~shared/types/domain/node'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'
import { byProp } from '~shared/utils/ramda'
import { $selectedNode } from '~stores/$selectedNode'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'

const $rawNodeSettings = createStore<NodeSettings[]>([])
  .on(projectFx.doneData, (state, result) => result.nodeSettings)
  .reset(resetProject)

export const $nodeSettings = $rawNodeSettings.map<Record<NodeId, NodeSettings>>(byProp('nodeId'))

export const $selectedNodeSettings = combine(
  $selectedNode,
  $nodeSettings,
  (node, settings) => settings[node?.value.id ?? '']
)
