import React, { ReactElement } from 'react'

import { Maybe, NonEmptyArray } from '../../shared/types/generic'

interface OwnProps<T> {
  list: Maybe<T[]>
  children: (list: NonEmptyArray<T>) => ReactElement | ReactElement[]
  as?: (...args: any[]) => JSX.Element
}

const isNotEmptyArray = <T,>(list: any): list is NonEmptyArray<T> =>
  list != null && Array.isArray(list) && list.length > 0

export function NotEmptyList<T>({ list, children, as: Tag }: OwnProps<T>): ReactElement | null {
  return isNotEmptyArray<T>(list) ? Tag ? <Tag>{children(list)}</Tag> : <>{children(list)}</> : null
}
