import { TablerIcon as IconProp } from '@tabler/icons'
import clsx from 'clsx'
import React, { FC, ForwardedRef, HTMLAttributes } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import styled from 'styled-components'

export type OwnProps = {
  icon: IconProp
  forwardRef?: ForwardedRef<HTMLButtonElement>
  focus?: boolean
  tooltip?: string
  size?: number
  iconClasses?: string
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

  &.focus:focus {
    border: 1px dotted #999;
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

const IconTooltip = styled(Tooltip)``

const WithTooltip: FC<{ tooltip?: string }> = ({ tooltip, children }) =>
  tooltip != null ? (
    <OverlayTrigger overlay={<IconTooltip>{tooltip}</IconTooltip>} delay={0}>
      <>{children}</>
    </OverlayTrigger>
  ) : (
    <>{children}</>
  )

export const Icon: FC<OwnProps> = ({
  icon: IconCmp,
  tooltip,
  forwardRef,
  focus = true,
  size = 16,
  iconClasses,
  ...props
}) => (
  <WithTooltip tooltip={tooltip}>
    <Button
      className={clsx('d-block icon-xs', { focus })}
      {...props}
      tabIndex={focus ? 0 : -1}
      ref={forwardRef}
    >
      <IconCmp
        className={clsx('d-block user-select-none', iconClasses)}
        width={size}
        height={size}
        stroke={1}
      />
    </Button>
  </WithTooltip>
)
