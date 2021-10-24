import clsx from 'clsx'
import React, { FC } from 'react'
import { Button, ButtonProps } from 'react-bootstrap'

export const ClickLink: FC<ButtonProps> = ({ className, children, ...props }) => (
  <Button variant="link" className={clsx('text-decoration-none', className)} {...props}>
    {children}
  </Button>
)
