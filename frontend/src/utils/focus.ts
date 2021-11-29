import { Maybe } from '../shared/types/generic'

export const focus = <T extends HTMLElement>(el: Maybe<T>) => {
  if (el != null) {
    el.focus({ preventScroll: true })
  }
}
