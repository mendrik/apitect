import clsx from 'clsx'
import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { addParams } from '~shared/utils/url'

import { Jsx } from '../../shared/types/generic'

type OwnProps = {
  modal: string
} & Omit<LinkProps, 'to'>

export const ModalLink = ({ modal, className, children, ...props }: Jsx<OwnProps>) => (
  <Link className={clsx('text-decoration-none', className)} to={addParams({ modal })} {...props}>
    {children}
  </Link>
)
