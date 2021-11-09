import { TablerIcon as IconProp } from '@tabler/icons'
import clsx from 'clsx'
import React, { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type OwnProps = {
  icon: IconProp
  size?: number
  iconClasses?: string
  disabled?: boolean
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
  outline: none;

  svg {
    color: #333;
    transition: all 0.2s ease-in-out;
  }

  &[disabled] {
    svg {
      color: #999;
    }
    pointer-events: none;
  }

  &:not([disabled]) {
    &.focus:focus {
      border: 1px dotted #999;
    }

    &.focus:active {
      background-color: white;
    }

    &:hover {
      border: 1px dotted $bezelDark;

      svg {
        color: black;
        filter: drop-shadow(1px 1px 1px #999);
      }
    }
  }
`

export const Icon: FC<OwnProps> = ({
  icon: IconCmp,
  disabled = false,
  size = 16,
  iconClasses,
  tabIndex = -1,
  ...props
}) => (
  <Button
    type="button"
    className={clsx('d-block')}
    {...props}
    tabIndex={tabIndex}
    disabled={disabled}
  >
    <IconCmp
      className={clsx('d-block user-select-none', iconClasses)}
      focusable="false"
      role="img"
      width={size}
      height={size}
      stroke={1}
      tabIndex={-1}
    />
  </Button>
)
