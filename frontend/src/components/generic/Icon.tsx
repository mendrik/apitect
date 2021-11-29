import { TablerIcon as IconProp } from '@tabler/icons'
import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { Palette } from '../../css/colors'
import { Jsx } from '../../shared/types/generic'

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
    color: ${Palette.iconText};
    transition: all 0.2s ease-in-out;
  }

  &:not([disabled]) {
    &.focus:focus {
      border: 1px dotted ${Palette.iconBorder};
    }

    &.focus:active {
      background-color: white;
    }

    &:hover {
      svg {
        color: black;
        filter: drop-shadow(1px 1px 1px #999);
      }
    }
  }
`

export const Icon = ({
  icon: IconCmp,
  disabled = false,
  size = 16,
  iconClasses,
  tabIndex = -1,
  ...props
}: Jsx<OwnProps>) => (
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
