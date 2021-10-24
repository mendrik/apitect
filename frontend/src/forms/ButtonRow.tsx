import clsx from 'clsx'
import React, { FC, HTMLAttributes } from 'react'

export const ButtonRow: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={clsx('d-grid gap-2 d-sm-flex justify-content-sm-end', className)} {...props}>
    {children}
  </div>
)
