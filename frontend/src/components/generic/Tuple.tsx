import clsx from 'clsx'
import { find, findLast } from 'ramda'
import { isNotNil } from 'ramda-adjunct'
import React, { FC } from 'react'
import { match } from 'ts-pattern'

export enum Scale {
  CONTENT,
  MAX
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

const getFlexBasis = (scale: Scale): string => {
  return match(scale)
    .with(Scale.MAX, () => '100%')
    .with(Scale.CONTENT, () => 'fit-content')
    .otherwise(() => 'auto')
}

export const Tuple: FC<OwnProps> = ({
  orientation = Orientation.Horizontal,
  first,
  second,
  gap = 0,
  children
}) => {
  return (
    <div
      className={clsx(`d-flex justify-content-between gap-${gap}`, {
        'flex-row': orientation === Orientation.Horizontal,
        'flex-col': orientation === Orientation.Vertical,
        'w-100': orientation === Orientation.Horizontal,
        'h-100': orientation === Orientation.Vertical
      })}
    >
      <div className="d-flex align-items-center" style={{ flexBasis: getFlexBasis(first) }}>
        {find(isNotNil, children)}
      </div>
      <div className="d-flex align-items-center" style={{ flexBasis: getFlexBasis(second) }}>
        {findLast(isNotNil, children)}
      </div>
    </div>
  )
}
