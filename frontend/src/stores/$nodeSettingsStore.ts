import { createStore } from 'effector'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'
import { NodeSettings } from '../shared/types/forms/nodetypes/nodeSettings'
import { byProp } from '../shared/utils/ramda'

const $rawNodeSettings = createStore<NodeSettings[]>([])
export const $nodeSettings = $rawNodeSettings.map(arr => byProp('nodeId', arr))

$rawNodeSettings.watch(projectFx.done, (state, { result }) => result.nodeSettings)
$rawNodeSettings.reset(resetProject)
