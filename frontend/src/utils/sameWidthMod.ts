import type { Modifier } from '@popperjs/core'

export const sameWidth: Modifier<'sameWidth', {}> = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${
      state.elements.reference.getBoundingClientRect().width
    }px`
  }
}

export const maxHeight: Modifier<'maxHeight', {}> = {
  name: 'maxHeight',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    const reference: DOMRect = state.elements.reference.getBoundingClientRect()
    const popper = state.rects.popper
    const overflow = window.innerHeight - (reference.y + reference.height + popper.height)
    state.styles.popper.height = `${popper.height + overflow - 10}px`
  }
}

export const offset = {
  name: 'offset',
  options: {
    offset: [0, -5]
  }
}
