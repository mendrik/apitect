import { TablerIcon as IconProp } from '@tabler/icons'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { Palette } from '../../css/colors'

export type OwnProps = {
  icon: IconProp
  size?: number
  iconClasses?: string
  disabled?: boolean
} & HTMLAttributes<HTMLDivElement>

const Wrap = styled.div`
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
  <Wrap
    className={clsx('d-block', { 'cursor-pointer': !!props.onClick })}
    {...props}
    data-disabled={disabled}
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
  </Wrap>
)
