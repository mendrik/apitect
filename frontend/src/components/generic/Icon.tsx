import React, { FC, HTMLAttributes } from 'react'
import { Icon as IconProp } from 'react-feather'

type OwnProps = {
  icon: IconProp
} & HTMLAttributes<HTMLAnchorElement>

export const Icon: FC<OwnProps> = ({ icon: IconCmp, ...props }) => {
  return (
    <a type="button" className="d-block icon-xs" {...props}>
      <IconCmp className="d-block icon-xs user-select-none" />
    </a>
  )
}
