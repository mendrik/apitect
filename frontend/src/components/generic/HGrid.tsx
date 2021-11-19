import clsx from 'clsx'
import React, { Children, HTMLAttributes } from 'react'

import { Jsx } from '../../shared/types/generic'

export const HGrid = ({ className, children, ...props }: Jsx<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={clsx('d-grid', className)}
      style={{ gridTemplateColumns: `repeat(${Children.count(children)},1fr)` }}
      {...props}
    >
      {children}
    </div>
  )
}
