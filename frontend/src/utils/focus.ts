import { Maybe } from '../shared/types/generic'

export const focus = <T extends HTMLElement>(el: Maybe<T>) => el?.focus?.({ preventScroll: true })

export const domElementById = <T extends { id: string }>(el: Maybe<T>): Maybe<HTMLElement> =>
  el?.id ? document.getElementById(el.id) : null
