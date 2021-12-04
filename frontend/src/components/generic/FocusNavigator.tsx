import { allPass, always, cond, equals, propEq } from 'ramda'
import React, { HTMLAttributes, useRef } from 'react'
import { Jsx, Maybe } from '~shared/types/generic'
import { next, prev } from '~shared/utils/ramda'

import { stopPropagation } from '../../utils/stopPropagation'

type OwnProps = {
  columns?: number
  rotated?: boolean
} & HTMLAttributes<HTMLDivElement>

enum Direction {
  Left,
  Right,
  Up,
  Down
}

export const FocusNavigator = ({
  columns = 1,
  rotated = false,
  children,
  ...props
}: Jsx<OwnProps>) => {
  const ref = useRef<HTMLDivElement>(null)

  const moveFocus = (dir: Direction) =>
    stopPropagation(() => {
      const current = document.activeElement as Maybe<HTMLElement>
      if (ref.current != null && ref.current.matches(':focus-within') && current != null) {
        const focusables = Array.from<HTMLElement>(
          ref.current.querySelectorAll(
            '[tabindex]:not([tabindex^="-"]),button:not([disabled]):not([tabindex^="-"])'
          )
        )

        console.log(focusables.length)

        const rowCount = rotated ? focusables.length / columns : columns
        const currentIndex = focusables.findIndex(equals(current))

        if (dir === Direction.Right) {
          const startIndex = currentIndex - (currentIndex % rowCount)
          next(equals(current))(focusables.slice(startIndex, startIndex + rowCount))?.focus()
        } else if (dir === Direction.Left) {
          const startIndex = currentIndex - (currentIndex % rowCount)
          prev(equals(current))(focusables.slice(startIndex, startIndex + rowCount))?.focus()
        } else if (dir === Direction.Up) {
          next(
            equals(
              focusables[(currentIndex - rowCount - 1 + focusables.length) % focusables.length]
            )
          )(focusables)?.focus()
        } else if (dir === Direction.Down) {
          prev(equals(focusables[(currentIndex + rowCount + 1) % focusables.length]))(
            focusables
          )?.focus()
        }
      }
    })

  const keyMap = cond([
    [propEq('key', 'ArrowLeft'), moveFocus(rotated ? Direction.Up : Direction.Left)],
    [propEq('key', 'ArrowRight'), moveFocus(rotated ? Direction.Down : Direction.Right)],
    [propEq('key', 'ArrowUp'), moveFocus(rotated ? Direction.Left : Direction.Up)],
    [propEq('key', 'ArrowDown'), moveFocus(rotated ? Direction.Right : Direction.Down)],
    [
      allPass([always(rotated), propEq('shiftKey', true), propEq('key', 'Tab')]),
      moveFocus(Direction.Up)
    ],
    [allPass([always(rotated), propEq('key', 'Tab')]), moveFocus(Direction.Down)]
  ])

  return (
    <div {...props} onKeyDown={keyMap} ref={ref}>
      {children}
    </div>
  )
}
