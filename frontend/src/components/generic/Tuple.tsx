import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

export enum Scale {
  CONTENT = 'content',
  MAX = 'max',
  AUTO = 'auto'
}

export enum Orientation {
  Horizontal,
  Vertical
}

type OwnProps = {
  first?: Scale
  second?: Scale
  orientation?: Orientation
  gap?: number
} & HTMLAttributes<HTMLDivElement>

const StyledTuple = styled.div`
  &.first-auto > :first-child {
    flex-basis: auto;
  }
  &.first-content > :first-child {
    flex-basis: min-content;
  }
  &.first-max > :first-child {
    flex-basis: 100%;
  }
  &.second-auto > :nth-child(2) {
    flex-basis: auto;
  }
  &.second-max > :nth-child(2) {
    flex-basis: 100%;
  }
  &.second-content > :nth-child(2) {
    flex-basis: min-content;
  }
`

export const Tuple = ({
  orientation = Orientation.Horizontal,
  first = Scale.AUTO,
  second = Scale.AUTO,
  gap = 0,
  children,
  className = 'align-items-center',
  ...props
}: Jsx<OwnProps>) => (
  <StyledTuple
    className={clsx(
      `d-flex justify-content-between gap-${gap}`,
      {
        'flex-row': orientation === Orientation.Horizontal,
        'flex-col': orientation === Orientation.Vertical,
        'w-100': orientation === Orientation.Horizontal,
        'h-100': orientation === Orientation.Vertical
      },
      `first-${first} second-${second}`,
      className
    )}
    {...props}
  >
    {children}
  </StyledTuple>
)
