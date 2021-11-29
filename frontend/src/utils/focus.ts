import { Maybe } from '../shared/types/generic'

export const focus = <T extends HTMLElement>(el: Maybe<T>) => {
  el?.focus?.({ preventScroll: true })
}
