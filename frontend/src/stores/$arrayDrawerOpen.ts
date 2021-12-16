import { isNotNil } from 'ramda-adjunct'
import { $selectedArrayNode } from '~stores/$selectedNode'

export const $arrayDrawerOpen = $selectedArrayNode.map(isNotNil)
