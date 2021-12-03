import { createStore } from 'effector'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'
import { NodeSettings } from '../shared/types/forms/nodetypes/nodeSettings'
import { byProp } from '../shared/utils/ramda'

const $rawNodeSettings = createStore<NodeSettings[]>([])
  .on(projectFx.done, (state, { result }) => result.nodeSettings)
  .reset(resetProject)

export const $nodeSettings = $rawNodeSettings.map(arr => byProp('nodeId', arr))
