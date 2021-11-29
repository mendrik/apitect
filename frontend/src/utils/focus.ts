import { Maybe } from '../shared/types/generic'

export const focus = <T extends HTMLElement>(el: Maybe<T>) => {
  console.log(el)
  el?.focus?.({ preventScroll: true })
}
