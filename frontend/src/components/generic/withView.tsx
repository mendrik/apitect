import { FC, useContext } from 'react'

import { ViewContext } from './View'

export const withView =
  <T extends object>(fc: FC<T>): FC<T & { view?: string | number }> =>
  ({ view: viewLock, ...props }) => {
    const { view } = useContext(ViewContext)
    return view == null || view === viewLock ? fc(props as any) : null
  }
