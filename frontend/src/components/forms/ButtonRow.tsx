import clsx from 'clsx'
import { cond, propEq } from 'ramda'
import React, { HTMLAttributes, useRef } from 'react'

import { Jsx } from '../../shared/types/generic'
import { next, prev } from '../../shared/utils/ramda'
import { stopPropagation } from '../../utils/stopPropagation'

enum Direction {
  Left,
  Right
}

export const ButtonRow = ({
  className,
  children,
  ...props
}: Jsx<HTMLAttributes<HTMLDivElement>>) => {
  const ref = useRef<HTMLDivElement>(null)

  const moveFocus = (dir: Direction) => (ev: Event) => {
    if (ref.current != null && ref.current.matches(':focus-within')) {
      const buttons = Array.from(ref.current.querySelectorAll('button'))
      if (dir === Direction.Right) {
        next(b => document.activeElement === b)(buttons)?.focus()
      } else {
        prev(b => document.activeElement === b)(buttons)?.focus()
      }
    }
  }

  const keyMap = cond([
    [propEq('key', 'ArrowLeft'), moveFocus(Direction.Left)],
    [propEq('key', 'ArrowRight'), moveFocus(Direction.Right)]
  ])

  return (
    <div
      ref={ref}
      onKeyDown={stopPropagation(keyMap)}
      className={clsx('d-grid gap-2 d-sm-flex justify-content-sm-end', className)}
      {...props}
    >
      {children}
    </div>
  )
}
