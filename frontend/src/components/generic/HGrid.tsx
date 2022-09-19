import clsx from 'clsx'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import { Children, HTMLAttributes } from 'react'

export const HGrid = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const childCount = Children.toArray(children).filter(isNotNilOrEmpty).length
  return (
    <div
      className={clsx('d-grid', className)}
      style={{ gridTemplateColumns: `repeat(${childCount}, 1fr)` }}
      {...props}
    >
      {children}
    </div>
  )
}
