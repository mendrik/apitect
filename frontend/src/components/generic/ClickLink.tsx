import clsx from 'clsx'
import React from 'react'
import { Button, ButtonProps } from 'react-bootstrap'

import { Jsx } from '../../shared/types/generic'

export const ClickLink = ({ className, children, ...props }: Jsx<ButtonProps>) => (
  <Button variant="link" className={clsx('text-decoration-none', className)} {...props}>
    {children}
  </Button>
)
