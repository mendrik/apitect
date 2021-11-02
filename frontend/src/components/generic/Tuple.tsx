import clsx from 'clsx'
import React, { FC } from 'react'
import styled from 'styled-components'

export enum Scale {
  CONTENT = 'content',
  MAX = 'max'
}

export enum Orientation {
  Horizontal,
  Vertical
}

type OwnProps = {
  children: JSX.Element[]
  first: Scale
  second: Scale
  orientation?: Orientation
  gap?: number
}

const StyledTuple = styled.div`
  &.first-content > *:first-child {
    flex-basis: fit-content;
  }
  &.first-max > *:nth-child(1) {
    flex-basis: 100%;
  }
  &.second-content > *:first-child {
    flex-basis: 100%;
  }
  &.second-content > *:nth-child(1) {
    flex-basis: fit-content;
  }
`

export const Tuple: FC<OwnProps> = ({
  orientation = Orientation.Horizontal,
  first,
  second,
  gap = 0,
  children
}) => (
  <StyledTuple
    className={clsx(
      `d-flex justify-content-between gap-${gap} align-items-center`,
      {
        'flex-row': orientation === Orientation.Horizontal,
        'flex-col': orientation === Orientation.Vertical,
        'w-100': orientation === Orientation.Horizontal,
        'h-100': orientation === Orientation.Vertical
      },
      `first-${first} second-${second}`
    )}
  >
    {children}
  </StyledTuple>
)
