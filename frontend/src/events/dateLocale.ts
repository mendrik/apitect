import { createEffect } from 'effector'
import { ArgFn } from '~shared/types/generic'

export const dateLocaleFx = createEffect<ArgFn<string, Promise<Locale>>>(locale =>
  import(/* @vite-ignore */ `../../node_modules/date-fns/locale/${locale}`).then(x => x.default)
)
