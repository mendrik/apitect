import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'

import { Jsx } from '../shared/types/generic'

export const ButtonRow = ({
  className,
  children,
  ...props
}: Jsx<HTMLAttributes<HTMLDivElement>>) => (
  <div className={clsx('d-grid gap-2 d-sm-flex justify-content-sm-end', className)} {...props}>
    {children}
  </div>
)
