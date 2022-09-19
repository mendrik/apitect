import clsx from 'clsx'
import { HTMLAttributes } from 'react'

import { FocusNavigator } from '../generic/FocusNavigator'

export const ButtonRow = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <FocusNavigator
    columns={2}
    rotated
    ctrlKey={false}
    className={clsx('d-grid gap-2 d-sm-flex justify-content-sm-end', className)}
    {...props}
  >
    {children}
  </FocusNavigator>
)
