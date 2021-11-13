import { createEffect, createEvent, sample } from 'effector'

import { Api } from '../shared/api'
import { Node } from '../shared/types/domain/tree'
import { Maybe } from '../shared/types/generic'
import $appStore from '../stores/$appStore'

export const openNodeState = createEvent<[Node, boolean]>('toggle node')
export const openNode = (node: Maybe<Node>) => (node ? openNodeState([node, true]) : void 0)
export const closeNode = (node: Maybe<Node>) => (node ? openNodeState([node, false]) : void 0)
export const selectNode = createEvent<Maybe<Node>>('select node')

const state = () => sample($appStore).getState()

export const createNodeFx = createEffect<Api['nodeCreate']>(node => state().api.nodeCreate(node))
export const deleteNodeFx = createEffect<Api['nodeDelete']>(id => state().api.nodeDelete(id))
export const documentFx = createEffect<Api['document']>(() => state().api.document())
export const updateNodeSettingsFx = createEffect<Api['updateNodeSettings']>(settings =>
  state().api.updateNodeSettings(settings)
)
