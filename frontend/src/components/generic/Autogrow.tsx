import clsx from 'clsx'
import { concat, cond, converge, pathEq, pipe, prop } from 'ramda'
import React, { HTMLAttributes, ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { eventValue } from '../../utils/eventUtils'

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
  max-width: 150px;

  ~ input {
    padding: initial;
    overflow: hidden;
    width: 100%;
  }
`

export const Autogrow = ({ className, initial, children, ...props }: Jsx<OwnProps>) => {
  const [value, setValue] = useState<ReactNode>(initial)

  const measureDown = cond([
    [
      pathEq(['key', 'length'], 1),
      pipe(converge(concat as any, [eventValue, prop('key')]), setValue)
    ]
  ])

  const measureUp = pipe<any, any, any>(eventValue, setValue)

  return (
    <div
      onKeyDown={measureDown}
      onKeyUp={measureUp}
      className={clsx('d-grid', className)}
      {...props}
    >
      <MeasureSx>{value}</MeasureSx>
      {children}
    </div>
  )
}
