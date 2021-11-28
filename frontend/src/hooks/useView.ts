import { keys, reduce } from 'ramda'
import { useRef, useState } from 'react'

import { Fn } from '../shared/types/generic'
import { decapitalizeFirst } from '../shared/utils/ramda'

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
        [`${decapitalizeFirst(v)}View`]: (ev: Event) => {
          ev?.preventDefault()
          setView(anEnum[v])
        }
      }),
      {} as ViewMethods<T>,
      keys(anEnum)
    )
  )

  console.log(methods)

  return {
    view,
    ...methods.current
  }
}
