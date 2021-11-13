import { createEvent } from 'effector'

import { ModalNames } from '../shared/types/modals'

export type ModalParams<T> = {
  name: ModalNames
  params?: T
}

export const openModal = createEvent<ModalParams<any>>('modal-open')
export const closeModal = createEvent('modal-close')
