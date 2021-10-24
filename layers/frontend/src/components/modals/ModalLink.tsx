import { addParams } from '@utils/url'
import clsx from 'clsx'
import React, { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'

type OwnProps = {
  modal: string
} & Omit<LinkProps, 'to'>

export const ModalLink: FC<OwnProps> = ({ modal, className, children, ...props }) => (
  <Link className={clsx('text-decoration-none', className)} to={addParams({ modal })} {...props}>
    {children}
  </Link>
)
