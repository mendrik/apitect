import React, { FC, ForwardedRef, HTMLAttributes } from 'react'
import { Icon as IconProp } from 'react-feather'
import styled from 'styled-components'

import { withView } from './withView'

export type OwnProps = {
  icon: IconProp
  forwardRef?: ForwardedRef<HTMLButtonElement>
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

  &:focus {
    border: 1px dotted #999;
    outline: none;
  }

  &:active {
    background-color: white;
  }

  &:hover {
    border: 1px dotted $bezelDark;

    svg {
      filter: drop-shadow(1px 1px 1px #aaa);
    }
  }
`

const $Icon: FC<OwnProps> = ({ icon: IconCmp, forwardRef, ...props }) => {
  return (
    <Button className="d-block icon-xs" {...props} tabIndex={0} ref={forwardRef}>
      <IconCmp className="d-block user-select-none" style={{ width: 16, height: 16 }} />
    </Button>
  )
}

export const Icon = withView($Icon)
