import { Seconds } from '~shared/types/generic'

export const wait = (delay: Seconds) => () =>
  new Promise<void>(res => setTimeout(res, delay * 1000.0))
