import type { Modifier } from '@popperjs/core'

export const sameWidth: Modifier<any, any> = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }: any) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }: any) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`
  }
}

export const maxHeight: Modifier<any, any> = {
  name: 'maxHeight',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }: any) => {
    const reference: DOMRect = state.elements.reference.getBoundingClientRect()
    const popper: DOMRect = state.rects.popper
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
