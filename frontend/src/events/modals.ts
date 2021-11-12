import { createEvent } from 'effector'

export const openModal = createEvent<string>('modal-open')
export const closeModal = createEvent('modal-close')
