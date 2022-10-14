import { createStore } from 'effector'

import { closeModal, ModalParams, openModal } from '../events/modals'
import { projectFx } from '../events/project'

export const $modalStore = createStore<ModalParams<any> | null>(null)
  .on(openModal, (state, result) => result)
  .on(closeModal, () => null)
  .on(projectFx.done, () => null)
