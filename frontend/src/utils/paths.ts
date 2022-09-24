import { SyntheticEvent } from 'react'

export const eventValue = <E extends SyntheticEvent<HTMLInputElement>>(
  ev: Parameters<{ bivarianceHack(event: E): void }['bivarianceHack']>[0] & {
    target: HTMLInputElement
  }
) => ev.target.value
