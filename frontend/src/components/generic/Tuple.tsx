import clsx from 'clsx'
import { isNil, reject } from 'ramda'
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
  const items = reject(isNil, children)

  console.log(children.map(i => i === null))

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
        {items[0]}
      </div>
      <div className="d-flex align-items-center" style={{ flexBasis: getFlexBasis(second) }}>
        {items[1]}
      </div>
    </div>
  )
}
