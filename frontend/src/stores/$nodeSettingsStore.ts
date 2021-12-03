import { createStore } from 'effector'

import { projectFx } from '../events/tree'
import { NodeSettings } from '../shared/types/forms/nodetypes/nodeSettings'
import { byProp } from '../shared/utils/ramda'

const $rawNodeSettings = createStore<NodeSettings[]>([])
export const $nodeSettingsStore = $rawNodeSettings.map(arr => byProp('nodeId', arr))

$rawNodeSettings.on(projectFx.done, (state, { result }) => result.nodeSettings)
