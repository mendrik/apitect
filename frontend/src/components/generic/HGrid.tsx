import clsx from 'clsx'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import React, { Children, HTMLAttributes } from 'react'

import { Jsx } from '../../shared/types/generic'

export const HGrid = ({ className, children, ...props }: Jsx<HTMLAttributes<HTMLDivElement>>) => {
  const childCount = Children.toArray(children).filter(isNotNilOrEmpty).length
  return (
    <div
      className={clsx('d-grid', className)}
      style={{ gridTemplateColumns: `repeat(${childCount}, 1fr)` }}
      {...props}
    >
      {children}
    </div>
  )
}
