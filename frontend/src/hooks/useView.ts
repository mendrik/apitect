import { keys, reduce } from 'ramda'
import { useRef, useState } from 'react'

import { Fn } from '../shared/types/generic'

type ViewMethods<T extends string> = {
  [key in T as `${Uncapitalize<key>}View`]: Fn
}

export const useView = <T extends string, E extends string | number>(anEnum: {
  [K in T]: E
}) => {
  const [view, setView] = useState<E>((anEnum as any)[(anEnum as any)[0]] as any)

  const methods = useRef(
    reduce(
      (p, v) => ({
        ...p,
        [`${v.toLowerCase()}View`]: (ev: Event) => {
          ev?.preventDefault()
          setView(anEnum[v])
        }
      }),
      {} as ViewMethods<T>,
      keys(anEnum)
    )
  )

  return {
    view,
    ...methods.current
  }
}