import clsx from 'clsx'
import { concat, cond, converge, isEmpty, pathEq, pipe, propOr, unless } from 'ramda'
import React, { HTMLAttributes, ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { target } from '../../utils/eventUtils'

type OwnProps = {
  className?: string
  initial?: ReactNode
} & HTMLAttributes<HTMLDivElement>

const MeasureSx = styled.div`
  position: relative;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  width: min-content;
  padding: 0px 3px;

  ~ div > input {
    padding: initial;
    overflow: visible;
    width: calc(100% + 2px);
    border: 1px solid black;
    padding: 3px;
  }
`

export const Autogrow = ({ className, initial, children, ...props }: Jsx<OwnProps>) => {
  const [value, $setValue] = useState<ReactNode>(initial)

  const setValue = unless(isEmpty, $setValue)

  const measureDown = cond([
    [
      pathEq(['key', 'length'], 1),
      pipe(converge(concat, [target.value, propOr('key')] as any), setValue)
    ]
  ])

  const measureUp = pipe<any, any, any>(target.value, setValue)

  return (
    <div
      onKeyDown={e => console.log(target.value(e))}
      onKeyUp={measureUp}
      className={clsx('d-grid', className)}
      {...props}
    >
      <MeasureSx>{value}</MeasureSx>
      <div>{children}</div>
    </div>
  )
}
