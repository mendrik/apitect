import { TablerIcon as IconProp } from '@tabler/icons'
import clsx from 'clsx'
import React, { FC, ForwardedRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type OwnProps = {
  icon: IconProp
  forwardRef?: ForwardedRef<HTMLButtonElement>
  focus?: boolean
} & HTMLAttributes<HTMLButtonElement>

const Button = styled.button`
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 3px;
  margin: 0;
  border-radius: 5px;
  border: 1px solid transparent;

  &.focus:focus {
    border: 1px dotted #999;
    outline: none;
  }

  &.focus:active {
    background-color: white;
  }

  &:hover {
    border: 1px dotted $bezelDark;
    color: black;

    svg {
      filter: drop-shadow(1px 1px 1px #aaa);
    }
  }
`

export const Icon: FC<OwnProps> = ({ icon: IconCmp, forwardRef, focus = true, ...props }) => {
  return (
    <Button className={clsx('d-block icon-xs', { focus })} {...props} tabIndex={0} ref={forwardRef}>
      <IconCmp className="d-block user-select-none" width={14} height={14} />
    </Button>
  )
}
